import {
  IsBoolean,
  IsString,
  Length,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class UpdateTodoDTO {
  @IsString()
  @Length(1, 255)
  @ValidateIf((todo) => todo.title !== undefined)
  title: string;

  @IsString()
  @MinLength(1)
  @ValidateIf((todo) => todo.description !== undefined)
  description: string;

  @IsBoolean()
  @ValidateIf((todo) => todo.checked !== undefined)
  checked: boolean;
}
