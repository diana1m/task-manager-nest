import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TaskService } from 'src/services/task.service';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private readonly taskService: TaskService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { id } = request.params;
    const entity = await this.taskService.findOne(id);
    const user = request.user;

    if (entity && user && entity.user.id === user.id) {
      return true;
    }
    return false;
  }
}
