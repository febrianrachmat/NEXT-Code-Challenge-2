import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'johndoe', minLength: 3, maxLength: 50 })
  @IsString()
  @IsNotEmpty({ message: 'username should not be empty' })
  @MinLength(3, { message: 'username must be at least 3 characters' })
  @MaxLength(50)
  username: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty({ message: 'email should not be empty' })
  email: string;

  @ApiProperty({ example: 'secret', minLength: 6 })
  @IsString()
  @IsNotEmpty({ message: 'password should not be empty' })
  @MinLength(6, { message: 'password must be at least 6 characters' })
  password: string;
}
