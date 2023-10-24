import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  private logger: Logger = new Logger('AppGateway');

  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          const cookies = request.cookies;
          if (!cookies) {
            return;
          } else {
            const accessTokenCookie = cookies['access_token'];
            if (accessTokenCookie) {
              return accessTokenCookie;
            } 
          }
        },
      ]),
      secretOrKey: 'ysj', // JWT 시크릿 키
      ignoreExpiration: false,
    });
  }

  // validate 메소드의 data 매개변수에 들어가는 값은 JWT 토큰의 payload 부분!
  async validate(data) {
    const user = { userId: data.sub, username: data.username }
    return user;
  }
}
