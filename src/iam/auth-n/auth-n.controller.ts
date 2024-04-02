import {
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  HttpStatus,
} from '@nestjs/common';
import { IAuthNService } from './auth-n.service';
import { BASE_ENDPOINT } from '@/common/constants';
import { SignInDto, SignUpDto } from './auth-n.dto';

@Controller(`${BASE_ENDPOINT}/auth`)
export class AuthNController {
  constructor(private readonly authService: IAuthNService) {}

  @Post('sign-up')
  async signUp(@Body() data: SignUpDto) {
    return await this.authService.signUp(data);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() data: SignInDto) {
    return await this.authService.signIn(data);
  }
}
