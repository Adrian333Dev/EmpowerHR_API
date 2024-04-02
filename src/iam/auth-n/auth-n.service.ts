import { Injectable, UnauthorizedException } from '@nestjs/common';

// import { IAuthNService } from './auth-n.interface';
import { IUserService } from '@/domains/users/users.service';
import { SignInDto, SignUpDto } from './auth-n.dto';
import { HashingService } from '../hashing';

@Injectable()
export abstract class IAuthNService {
  abstract signUp(data: SignUpDto): Promise<any>; // TODO: Replace any with the actual return type
  abstract signIn(data: SignInDto): Promise<any>; // TODO: Replace any with the actual return type
}

@Injectable()
class AuthNService implements IAuthNService {
  constructor(
    private readonly usersService: IUserService,
    private readonly hashingService: HashingService,
  ) {}

  async signUp(data: SignUpDto) {
    const password = await this.hashingService.hash(data.password);
    return await this.usersService.create({ ...data, password });
  }

  async signIn(data: SignInDto) {
    const user = await this.usersService.findOneByEmail(data.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isPasswordValid = await this.hashingService.compare(
      data.password,
      user.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    return true;
  }
}

export const AuthNServiceProvider = {
  provide: IAuthNService,
  useClass: AuthNService,
} as const;