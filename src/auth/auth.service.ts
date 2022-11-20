import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { AccessTokenPayloadDto } from './dto/accessTokenPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.user({ username: username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload: AccessTokenPayloadDto = {
      username: user.username,
      sub: user.id,
    };

    const accessToken = this.jwtService.sign(payload);

    const decodedToken = this.jwtService.decode(accessToken);
    const cookieExpiresAt = new Date(decodedToken['exp'] * 1000);

    return {
      accessToken,
      cookieExpiresAt,
    };
  }
}
