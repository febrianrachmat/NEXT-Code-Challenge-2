import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiErrorResponses } from '../common/swagger/api-error-responses';
import { loginExample, userExample } from '../common/swagger/examples';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a user account. The password is hashed before storage.',
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    schema: { example: userExample },
  })
  @ApiErrorResponses(400, 409, 500)
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in a user',
    description: 'Validates credentials and returns a JWT access token.',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: { example: loginExample },
  })
  @ApiErrorResponses(400, 401, 500)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
