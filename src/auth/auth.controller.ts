import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '@/domains/users';
import { SignUpInput, SignInInput } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  async signUp(@Body() input: SignUpInput) {
    return await this.authService.signUp(input);
  }

  @Post('sign-in')
  async signIn(@Body() input: SignInInput) {
    return await this.authService.signIn(input);
  }
}
