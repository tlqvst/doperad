import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from 'process';
import { AccessTokenPayloadDto } from '../dto/accessTokenPayload.dto';

const jwtCookieExtractor = (req: Request) => {
  return req.cookies?.at;
};
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Auth header
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // From cookie
        jwtCookieExtractor,
      ]),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
    });
  }

  async validate(payload: AccessTokenPayloadDto) {
    return {
      userId: payload.sub,
      username: payload.username,
    };
  }
}
