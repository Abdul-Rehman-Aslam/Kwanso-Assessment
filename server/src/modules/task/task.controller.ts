import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { TASK_STATUS } from 'src/types';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':userId/:status?')
  getAllTasks(
    @Param('userId') userId: string,
    @Param('status') status?: TASK_STATUS,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<{
    tasks: Task[];
    limit: number;
    offset: number;
  }> {
    return this.taskService.getAllTasks(userId, status, limit, offset);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create task' })
  @ApiBody({ type: CreateTaskDto })
  create(@Body() body: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(body);
  }

  @Get(':userId')
  async findOneByUserId(@Param('userId') userId: string) {
    return await this.taskService.findOneByUserId(userId);
  }
}
