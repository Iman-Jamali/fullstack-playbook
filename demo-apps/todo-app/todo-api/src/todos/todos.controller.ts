import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';
import { GetUser } from '../users/get-user.decorator';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodosService } from './todos.service';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createTodoDTO: CreateTodoDTO,
    @GetUser() user: User,
  ): Promise<void> {
    return this.todosService.create(createTodoDTO, user);
  }

  @Get()
  getAll(@GetUser() user: User): Promise<Todo[]> {
    return this.todosService.findAll(user);
  }

  @Get('/:id')
  getById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todosService.findById(id, user);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTodoDTO: UpdateTodoDTO,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todosService.update(id, updateTodoDTO, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.todosService.delete(id, user);
  }
}
