import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  getTask(): string {
    return 'task';
  }
}
