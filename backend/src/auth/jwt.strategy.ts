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
          this.logger.log(cookies);
          if (!cookies) {
            this.logger.log('쿠키 없다고!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11');
          } else {
            const accessTokenCookie = cookies['access_token'];
            if (accessTokenCookie) {
              this.logger.log('쿠키있네' + accessTokenCookie);
              return accessTokenCookie;
            }
          }
          return null;
        },
      ]),
      secretOrKey: 'ysj', // JWT 시크릿 키
      ignoreExpiration: false,
    });
  }

  async validate(data) {
    const user = { userId: data.userId, username: data.username }
    return user;
  }
}
