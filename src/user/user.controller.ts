import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { SignupUserDto } from './dto/signup-user-request.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiResponse({ status: 409, description: 'Conflict (already exists)' })
  @ApiOperation({ summary: 'Registers a new user' })
  async signupUser(@Body() signupUserDto: SignupUserDto): Promise<void> {
    return this.userService.createUser(signupUserDto);
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Gets user information' })
  getProfile(@Request() req) {
    if (req.user) return { isLoggedIn: true, ...req.user };
    return { isLoggedIn: false };
  }
}
