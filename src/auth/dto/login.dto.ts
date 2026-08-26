import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'johndoe@example.com' })
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty({ message: 'email should not be empty' })
  email: string;

  @ApiProperty({ example: 'secret' })
  @IsString()
  @IsNotEmpty({ message: 'password should not be empty' })
  password: string;
}
