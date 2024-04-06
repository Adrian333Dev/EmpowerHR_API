import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwtConfig as config } from '../config';
import { IActiveUser } from '../interfaces';
import { ACCESS_TOKEN_STRATEGY } from '../constants';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  ACCESS_TOKEN_STRATEGY,
) {
  private readonly logger = new Logger(AccessTokenStrategy.name);

  constructor(
    @Inject(config.KEY) private readonly jwtConfig: ConfigType<typeof config>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.accessTokenSecret,
    });
    this.logger.log('Strategy initialized');
  }

  validate(payload: IActiveUser) {
    this.logger.log(
      `Validating user ${payload.email} with subject ${payload.sub} in access token strategy`,
    );
    return payload;
  }
}
