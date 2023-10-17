import { Injectable, Logger, Res } from '@nestjs/common';
import { Request, Response } from 'express'
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';


interface UserData {
  username: string;
  password: string;
}

interface RequestWithUser extends Request {
  user: any;
}


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }
  private logger: Logger = new Logger('AppGateway');


  async authCheck(request: RequestWithUser) {
    // validate의 return값 사용 가능
    const authenticatedUser = request.user;
    this.logger.log('req' + authenticatedUser);
    return true;
  }

  async login(response: Response, userData: UserData) {
    const user = await this.userService.findOneByUsername(userData.username);
    if (user && user.password === userData.password) {
      const payload = { username: userData.username, sub: user.id };
      const access_token = this.jwtService.sign(payload);

      // response.cookie('access_tokens', access_token, {
      //   httpOnly: true,
      // });
      response.setHeader('Authorization', 'Bearer ' + access_token);
      response.cookie('access_token', access_token, {
        domain: 'localhost',
        secure: false,
      });

      const resUserData = { userId: user.id, username: userData.username};

      this.logger.log('로그인 성공');
      return response.send(resUserData);
    }
    this.logger.log('로그인 실패');
    return response.status(401).json({ message: '로그인에 실패했습니다' });
  }

  async logout(response: Response) {
    response.cookie('access_token', '', {
      maxAge: 0
    })

    return response.send({
      message: 'logout seccess'
    })
  }
}