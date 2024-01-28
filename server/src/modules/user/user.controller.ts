import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { GetUserDto } from './dto/get-user.to';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Signup User' })
  @ApiBody({ type: CreateUserDto })
  create(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.singUp(body);
  }

  @ApiOperation({ summary: 'Get user by email' })
  @Get(':email')
  findOne(@Param('email') email: string): Promise<User> {
    return this.userService.findOne(email);
  }

  @ApiOperation({ summary: 'filter user by id' })
  @Get(':id')
  findUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }
}
