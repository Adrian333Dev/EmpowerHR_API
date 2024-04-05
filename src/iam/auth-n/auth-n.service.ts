import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { User } from '@prisma/client';

import { UsersService } from '@/domains/users/users.service';
import { RefreshTokenDto, SignInInput, SignUpInput } from './auth-n.input';
import { HashingService } from '../hashing';
import { jwtConfig as config } from '../config';
import { IActiveUser } from '../interfaces';
import { SignInOutput, SignUpOutput } from './auth-n.output';
import { InvalidatedRefreshTokenError, RefreshTokenStorage } from '@/domains/users/refresh-token.storage';
import { IAccessTokenPayload, IRefreshTokenPayload } from './auth-n.interface';

@Injectable()
export abstract class IAuthNService {
  abstract signUp(data: SignUpInput): Promise<SignUpOutput>;
  abstract signIn(data: SignInInput): Promise<SignInOutput>;
  abstract refreshTokens(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<SignInOutput>;
}

@Injectable()
class AuthNService implements IAuthNService {
  constructor(
    private readonly usersService: UsersService,
    private readonly refreshTokenStorage: RefreshTokenStorage,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(config.KEY) private readonly jwtConfig: ConfigType<typeof config>,
  ) {}

  async signUp(data: SignUpInput) {
    const password = await this.hashingService.hash(data.password);
    return await this.usersService.create({ ...data, password });
  }

  async signIn(data: SignInInput) {
    const user = await this.usersService.findOneByEmail(data.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isPasswordValid = await this.hashingService.compare(
      data.password,
      user.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');
    return await this.generateTokens(user);
  }

  async generateTokens(user: User) {
    const refreshTokenId = randomUUID();
    const accessTokenPayload: IAccessTokenPayload = { email: user.email };
    const refreshTokenPayload: IRefreshTokenPayload = { refreshTokenId };
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<IActiveUser>>(
        user.userId,
        this.jwtConfig.accessTokenTtl,
        accessTokenPayload,
      ),
      this.signToken(
        user.userId,
        this.jwtConfig.refreshTokenTtl,
        refreshTokenPayload,
      ),
    ]);
    await this.refreshTokenStorage.save(user.userId, refreshTokenId);
    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<IActiveUser, 'sub'> & IRefreshTokenPayload
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfig.secret,
        audience: this.jwtConfig.audience,
        issuer: this.jwtConfig.issuer,
      });
      const user = await this.usersService.findOne(sub);
      if (!user) throw new UnauthorizedException();
      await this.refreshTokenStorage.validate(
        user.userId,
        refreshTokenId,
      );
      await this.refreshTokenStorage.invalidate(user.userId, refreshTokenId);
      return this.generateTokens(user);
    } catch (err) {
      if (err instanceof InvalidatedRefreshTokenError)
        throw new UnauthorizedException('Access denied');
      throw new UnauthorizedException();
    }
  }

  // Helper methods
  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync({ sub: userId, ...payload }, {
      audience: this.jwtConfig.audience,
      issuer: this.jwtConfig.issuer,
      secret: this.jwtConfig.secret,
      expiresIn,
    } as JwtSignOptions);
  }
}

export const AuthNServiceProvider = {
  provide: IAuthNService,
  useClass: AuthNService,
} as const;
