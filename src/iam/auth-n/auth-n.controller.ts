import {
  Body,
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IAuthNService } from './auth-n.service';
import { BASE_ENDPOINT } from '@/common/constants';
import { SignInInput, SignUpInput } from './auth-n.input';
import { SignUpOutput } from './auth-n.output';
import { plainToClass } from 'class-transformer';

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
    return await this.authService.signIn(data);
  }
}
