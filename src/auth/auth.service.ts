import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthPayloadDto } from './dto/auth.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

const fakeUser: User = {
  id: 1,
  email: 'test@test.com',
  password: 'secret',
  firstName: 'louis',
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(payload: AuthPayloadDto) {
    const { password, email } = payload;
    console.log(this.userService);
    const user = await this.userService.findByEmail(email);

    if (user.password === password) {
      const { password, ...foundUser } = user;
      return this.jwtService.sign(foundUser);
    }
  }
}
