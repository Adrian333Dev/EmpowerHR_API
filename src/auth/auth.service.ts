import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { jwtConfig as config } from './config';
import { HashingService } from './hashing';
import { UsersService } from '@/domains/users';
import { SignUpInput, SignInInput } from './dto';
import { User } from '@prisma/client';
import { IUserWithEmployeeProfiles } from './interfaces';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
    private readonly usersService: UsersService,
    @Inject(config.KEY) private readonly jwtConfig: ConfigType<typeof config>,
  ) {}

  // HELPERS START
  // private async getTokens({
  //   userId,
  //   email,
  //   employeeProfiles,
  // }: IUserWithEmployeeProfiles) {
  //   const payload = { sub: userId, email, employeeProfiles };
  //   const accessToken = await this.jwtService.signAsync(payload, {
  //     audience: this.jwtConfig.audience,
  //     issuer: this.jwtConfig.issuer,
  //     secret: this.jwtConfig.accessTokenSecret,
  //     expiresIn: this.jwtConfig.accessTokenTtl,
  //   });
  //   const refreshToken = await this.jwtService.signAsync(
  //     { sub: userId },
  //     {
  //       audience: this.jwtConfig.audience,
  //       issuer: this.jwtConfig.issuer,
  //       secret: this.jwtConfig.refreshTokenSecret,
  //       expiresIn: this.jwtConfig.refreshTokenTtl,
  //     },
  //   );
  //   return { accessToken, refreshToken };
  // }

  // private async updateRefreshToken(userId: number, refreshToken: string) {
  //   return this.usersService.update({
  //     where: { userId },
  //     data: { refreshToken },
  //   });
  // }
  // HELPERS END

  async signUp(input: SignUpInput) {
    const password = await this.hashingService.hash(input.password);
    return this.usersService.create({ ...input, password });
  }

  async signIn(input: SignInInput) {
    const user = await this.usersService.findOne({
      where: { email: input.email },
      include: { employeeProfiles: true },
      select: {
        userId: true,
        email: true,
        password: true,
        employeeProfiles: { select: { empId: true, orgId: true, role: true } },
      },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isValidPassword = await this.hashingService.compare(
      input.password,
      user.password,
    );
    if (!isValidPassword)
      throw new UnauthorizedException('Invalid credentials');

    // accessToken only for now
  }
}
