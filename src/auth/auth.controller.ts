import {
  Body,
  Controller,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { CustomAuthGuard } from './guards/local.guards';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('login')
  @UseGuards(CustomAuthGuard)
  async login(@Body() authPayload: AuthPayloadDto) {
    console.log('here !!!!!!!');
    const user = await this.AuthService.signIn(authPayload);
    if (!user) throw new HttpException('no user found !', 404);
    return user;
  }
}
