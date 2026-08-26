import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateThreadDto {
  @ApiProperty({
    example: 'How do I set up environment variables in Node.js?',
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty({ message: 'title should not be empty' })
  @MaxLength(200, { message: 'title must be at most 200 characters' })
  title: string;

  @ApiProperty({
    example:
      'I am new to backend development and confused about how to hide my API keys. Could someone explain how to use dotenv?',
  })
  @IsString()
  @IsNotEmpty({ message: 'content should not be empty' })
  content: string;
}
