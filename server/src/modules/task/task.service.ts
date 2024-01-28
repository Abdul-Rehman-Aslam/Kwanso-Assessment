import {
  HttpStatus,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UserService } from './../user/user.service';
import { isEmpty } from 'lodash';
import { TASK_STATUS } from 'src/types';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<Task[]> {
    try {
      this.logger.log(`Retrieving all tasks.`);
      const tasks = await this.taskRepository.find();
      return tasks;
    } catch (error) {
      this.logger.error(`Failed to retrieve tasks.`);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          errorMessage: error.message,
        },
      });
    }
  }

  async getAllTasks(
    userId: string,
    status?: TASK_STATUS,
    limit?: number,
    offset?: number,
  ): Promise<{
    tasks: Task[];
    limit: number;
    offset: number;
  }> {
    try {
      this.logger.log(`Retrieving all tasks.`);
      const data = await this.userService.findUserById(userId);
      this.logger.log(`Retrieving all tasks. ${JSON.stringify(data)}`);
      if (!isEmpty(data)) {
        const { isSuperAdmin } = data;
        this.logger.log(`Retrieving all tasks. ${isSuperAdmin}`);
        let tasks: Task[];
        if (isSuperAdmin) {
          tasks = await this.taskRepository.find({
            where: {
              status: status,
            },
            take: limit,
            skip: offset,
          });
        } else {
          tasks = await this.taskRepository.find({
            where: {
              status: status,
              user: {
                id: data.id,
                isSuperAdmin: false,
              },
            },
            take: limit,
            skip: offset,
          });
        }
        return {
          tasks,
          limit,
          offset,
        };
      }
    } catch (error) {
      this.logger.error(`Failed to retrieve tasks.`);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          errorMessage: error.message,
        },
      });
    }
  }

  async createTask(task: CreateTaskDto): Promise<Task> {
    try {
      this.logger.log(`Creating task with data = ${JSON.stringify(task)}.`);
      const data = await this.taskRepository.save(task);
      return data;
    } catch (error) {
      this.logger.error(
        `Failed to create task. Data = ${JSON.stringify(task)}.`,
      );
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          errorMessage: error.message,
        },
      });
    }
  }

  async findOneByUserId(userId: string): Promise<Task[]> {
    try {
      this.logger.log(`Retrieving task with userId = ${userId}.`);
      const data = await this.taskRepository.find({
        where: {
          user: {
            id: userId,
          },
        },
      });
      return data;
    } catch (error) {
      this.logger.error(`Failed to retrieve task with userId = ${userId}.`);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          errorMessage: error.message,
        },
      });
    }
  }

  async findOneByTaskId(taskId: string): Promise<Task> {
    try {
      this.logger.log(`Retrieving task with taskId = ${taskId}.`);
      const data = await this.taskRepository.findOne({
        where: {
          id: taskId,
        },
      });
      return data;
    } catch (error) {
      this.logger.error(`Failed to retrieve task with taskId = ${taskId}.`);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          errorMessage: error.message,
        },
      });
    }
  }
}
