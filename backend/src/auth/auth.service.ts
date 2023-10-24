import { Injectable, Logger, Res } from '@nestjs/common';
import { Request, Response } from 'express'
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';


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


  async authCheck(request: RequestWithUser, response: Response) {
    const authenticatedUser = request.user;
    if (!authenticatedUser) {
      return response.status(401).json({ message: '유저 정보가 없음.' });
    }
    return response.status(200).json(authenticatedUser);
  }

  // 비밀번호 로직 변경 필요.
  async login(response: Response, userData: UserData) {
    const user = await this.userService.findOneByUsername(userData.username);
    if(!user){
      response.status(401).json({ message: '로그인 오류가 발생하였습니다.' });
      throw new Error('존재하지 않는 유저');
    }

    try{
      if(await argon2.verify(user.password ,userData.password)){
        const payload = { username: userData.username, sub: user.id };
        const access_token = this.jwtService.sign(payload);
  
        response.setHeader('Authorization', 'Bearer ' + access_token);
        response.cookie('access_token', access_token, {
          domain: 'localhost',
          secure: false,
          httpOnly: true,
        });
  
        const resUserData = { userId: user.id, username: userData.username};
  
        this.logger.log('로그인 성공');
        return response.send(resUserData);
      }else{
        this.logger.log('비밀번호 오류');
        return response.status(401).json({ message: '로그인 오류가 발생하였습니다.' });
      }
    }catch(error){
      this.logger.log('로그인 에러' + error);
      return response.status(401).json({ message: '로그인 오류가 발생하였습니다.' });
    }
  }

  async logout(response: Response) {
    response.cookie('access_token', '', {
      maxAge: 0
    })

    return response.send({
      message: 'logout success'
    })
  }
}