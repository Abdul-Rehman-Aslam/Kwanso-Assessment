import { InviteService } from './../invites/invites.service';
import {
  HttpStatus,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { GetUserDto } from './dto/get-user.to';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly inviteService: InviteService,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      this.logger.log('Getting all users...');
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      this.logger.error(`Error while getting users = ${error}`);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          errorMessage: error.message,
        },
      });
    }
  }

  async singUp(user: CreateUserDto): Promise<User> {
    try {
      const invite = await this.inviteService.getInvite(user.email);

      if (!invite) {
        this.logger.error(`Invite not found`);
        throw new UnprocessableEntityException({
          error: {
            errorMessage: 'Invite not found',
          },
          status: HttpStatus.UNPROCESSABLE_ENTITY,
        });
      } else {
        const checkIfUserExist = await this.userRepository.findOne({
          where: { email: user.email },
        });

        if (checkIfUserExist) {
          this.logger.error(`User already exist`);
          throw new UnprocessableEntityException('User Already Exist');
        } else {
          this.logger.log('Creating user...');
          const saltOrRounds = 10;
          const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
          user.password = hashedPassword;
          const userData = await this.userRepository.save(user);
          if (userData) {
            this.logger.log('User created successfully');
            return userData;
          }
        }
      }
    } catch (error) {
      this.logger.error(`Error while creating user = ${error}`);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          errorMessage: error.message,
        },
      });
    }
  }

  async findUserById(id: string): Promise<User> {
    try {
      this.logger.log('Getting user...');
      const user = await this.userRepository.findOne({
        where: { id: id },
      });

      return user;
    } catch (error) {
      this.logger.error(`Error while getting user = ${error}`);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          errorMessage: error.message,
        },
      });
    }
  }

  async findOne(email: string): Promise<User> {
    try {
      this.logger.log('Getting user...');
      const user = await this.userRepository.findOne({
        where: { email: email },
      });
      console.log(email, 'email');
      if (user) {
        this.logger.log('User found');
        return user;
      }
    } catch (error) {
      this.logger.error(`Error while getting user = ${error}`);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          errorMessage: error.message,
        },
      });
    }
  }
}
