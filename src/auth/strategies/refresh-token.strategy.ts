import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { jwtConfig as config } from '../config';
import { IActiveUser } from '../interfaces';
import { REFRESH_TOKEN_STRATEGY } from '../constants';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  REFRESH_TOKEN_STRATEGY,
) {
  private readonly logger = new Logger(RefreshTokenStrategy.name);
  constructor(@Inject(config.KEY) private readonly jwtConfig: ConfigType<typeof config>,) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: IActiveUser) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}
