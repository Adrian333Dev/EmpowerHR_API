import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { IUserService } from '@/domains/users/users.service';
import { RefreshTokenDto, SignInInput, SignUpInput } from './auth-n.input';
import { HashingService } from '../hashing';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { jwtConfig as config } from '../config';
import { ConfigType } from '@nestjs/config';
import { SignInOutput, SignUpOutput } from './auth-n.output';
import { IActiveUser } from '../interfaces';
import { User } from '@prisma/client';

@Injectable()
export abstract class IAuthNService {
  abstract signUp(data: SignUpInput): Promise<SignUpOutput>;
  abstract signIn(data: SignInInput): Promise<SignInOutput>;
}

@Injectable()
class AuthNService implements IAuthNService {
  constructor(
    private readonly usersService: IUserService,
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
    const [access_token, refresh_token] = await Promise.all([
      this.signToken<Partial<IActiveUser>>(
        user.userId,
        this.jwtConfig.accessTokenTtl,
        { email: user.email },
      ),
      this.signToken(user.userId, this.jwtConfig.refreshTokenTtl),
    ]);
    return { access_token, refresh_token };
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<IActiveUser, 'sub'>
      >(refreshTokenDto.refresh_token, {
        secret: this.jwtConfig.secret,
        audience: this.jwtConfig.audience,
        issuer: this.jwtConfig.issuer,
      });
      const user = await this.usersService.findOneByIdOrFail(sub);
      return this.generateTokens(user);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  // Helper methods
  private async signToken<T>(userId: number, expires_in: number, payload?: T) {
    return await this.jwtService.signAsync({ sub: userId, ...payload }, {
      audience: this.jwtConfig.audience,
      issuer: this.jwtConfig.issuer,
      secret: this.jwtConfig.secret,
      expires_in,
    } as JwtSignOptions);
  }
}

export const AuthNServiceProvider = {
  provide: IAuthNService,
  useClass: AuthNService,
} as const;
