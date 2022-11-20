import {
  Body,
  Controller,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth-guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth-guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: 201, description: 'Logged in, token created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Sign in and get access token' })
  async login(@Request() req, @Body() loginDto: LoginDto, @Response() res) {
    const loginData = await this.authService.login(req.user);

    return res
      .set({
        'Set-Cookie': `at=${loginData.accessToken}; Path=/; Expires=${loginData.cookieExpiresAt}; SameSite=Strict; HttpOnly; Secure`,
      })
      .json(req.user);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logs the user out by unsetting the cookie' })
  async logout(@Request() req, @Response() res) {
    return res.set({ 'Set-Cookie': `at=''; Path=/; Expires=0;` }).json('OK');
  }
}
