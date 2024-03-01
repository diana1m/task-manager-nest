import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from '../task/dto/create-task.dto';
import { UpdateTaskDto } from '../task/dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from 'db/entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTask: CreateTaskDto, id: number) {
    const isExist = await this.taskRepository.findOne({
      where: {
        user: { id },
        text: createTask.text,
        category: 0 as const,
      },
    });
    if (isExist) {
      throw new BadGatewayException('This task already exists!');
    }
    const newTask = {
      text: createTask.text,
      category: 0 as const,
      user: { id },
    };
    return await this.taskRepository.save(newTask);
  }

  async findAll(id: number) {
    return await this.taskRepository.find({
      where: {
        user: { id },
      },
    });
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });
    if (!task) throw new NotFoundException('Task not found');

    await this.taskRepository.update(id, updateTaskDto);
    const updatesTask = await this.taskRepository.findOne({
      where: { id },
    });
    return updatesTask;
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });
    if (!task) throw new NotFoundException('Task not found');
    await this.taskRepository.delete(id);
    return 'Success delete';
  }
}
