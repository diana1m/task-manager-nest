import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'db/entities';

export class CreateTaskDto {
  @IsNotEmpty()
  text: string;

  @IsOptional()
  category?: 0 | 1 | 2;

  @IsOptional()
  user?: User;
}
