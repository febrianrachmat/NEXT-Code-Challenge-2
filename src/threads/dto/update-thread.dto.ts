import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateThreadDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'title should not be empty' })
  @MaxLength(200, { message: 'title must be at most 200 characters' })
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'content should not be empty' })
  content?: string;
}
