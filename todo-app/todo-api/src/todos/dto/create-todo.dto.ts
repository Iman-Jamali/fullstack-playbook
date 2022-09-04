import { IsString, MinLength, Length } from 'class-validator';

export class CreateTodoDTO {
  @IsString()
  @Length(1, 255)
  title: string;

  @IsString()
  @MinLength(1)
  description: string;
}
