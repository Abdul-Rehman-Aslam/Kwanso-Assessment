import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../../../modules/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { TASK_STATUS } from '../../../types';

export class CreateTaskDto {
  @IsNotEmpty({
    message: 'name should not be empty',
  })
  @IsString()
  title: string;

  @IsNotEmpty({
    message: 'description should not be empty',
  })
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(TASK_STATUS)
  status: TASK_STATUS;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  user?: User;
}
