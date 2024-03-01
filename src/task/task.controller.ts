import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { AuthorGuard } from 'src/guard/author.guard';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    return this.taskService.create(createTaskDto, +req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  findAll(@Req() req) {
    return this.taskService.findAll(+req.user.id);
  }

  // url/tasks/task/:id
  @Get(':id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
