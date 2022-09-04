import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(
    @Body(ValidationPipe) authRegisterDTO: AuthRegisterDTO,
  ): Promise<void> {
    return this.authService.register(authRegisterDTO);
  }

  @Post('/login')
  login(
    @Body(ValidationPipe) authLoginDTO: AuthLoginDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(authLoginDTO);
  }
}
