import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateThreadDto {
  @ApiPropertyOptional({
    example: 'Updated: environment variables in Node.js',
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'title should not be empty' })
  @MaxLength(200, { message: 'title must be at most 200 characters' })
  title?: string;

  @ApiPropertyOptional({
    example: 'Updated answer: create a .env file and load it with dotenv.',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'content should not be empty' })
  content?: string;
}
