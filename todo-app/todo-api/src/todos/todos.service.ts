import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todosRepository: Repository<Todo>,
  ) {}

  async create(createTodoDTO: CreateTodoDTO, user: User): Promise<void> {
    const { title, description } = createTodoDTO;
    const todo = new Todo();
    todo.title = title;
    todo.description = description;
    todo.user = user;
    try {
      await todo.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll(user: User): Promise<Todo[]> {
    try {
      const todos = await this.todosRepository.find({
        where: { user: { id: user.id } },
      });
      return todos;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findById(id: string, user: User): Promise<Todo> {
    try {
      const todo = await this.todosRepository.findOneOrFail({
        where: { id, user: { id: user.id } },
      });
      return todo;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Todo not found!`);
    }
  }

  async update(id: string, newTodo: UpdateTodoDTO, user: User): Promise<Todo> {
    const { title, description, checked } = newTodo;
    const todo = await this.findById(id, user);
    todo.title = title;
    todo.description = description;
    todo.checked = checked;
    try {
      return await todo.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete(id: string, user: User): Promise<void> {
    try {
      const result = await this.todosRepository.delete({
        id,
        user: { id: user.id },
      });
      if (result.affected === 0) {
        throw new NotFoundException(`Todo not found!`);
      }
    } catch (error) {
      console.log(error);
      // throw new NotFoundException(`Todo not found!`);
      throw error;
    }
  }
}
