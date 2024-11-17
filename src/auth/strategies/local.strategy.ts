import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UnauthorizedException } from '@nestjs/common';

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string) {
    console.log('we validate bro');
    const user = await this.authService.signIn({ email, password });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
