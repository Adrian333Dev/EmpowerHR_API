import {
  Body,
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { plainToClass } from 'class-transformer';

import { IAuthNService } from './auth-n.service';
import { BASE_ENDPOINT } from '@/common/constants';
import { SignInInput, SignUpInput, RefreshTokenDto } from './auth-n.input';
import { SignInOutput, SignUpOutput } from './auth-n.output';
import { Auth } from './decorators';
import { AuthType } from './enums';

@Auth(AuthType.None)
@UseInterceptors(
  new ClassSerializerInterceptor(new Reflector(), {
    excludeExtraneousValues: true,
    strategy: 'excludeAll',
  }),
)
@Controller(`${BASE_ENDPOINT}/auth`)
export class AuthNController {
  constructor(private readonly authService: IAuthNService) {}

  @Post('signup')
  async signUp(@Body() data: SignUpInput) {
    const user = await this.authService.signUp(data);
    return plainToClass(SignUpOutput, user);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() data: SignInInput) {
    const tokens = await this.authService.signIn(data);
    return plainToClass(SignInOutput, tokens);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@Body() data: RefreshTokenDto) {
    const tokens = await this.authService.refreshTokens(data);
    return plainToClass(SignInOutput, tokens);
  }
}
