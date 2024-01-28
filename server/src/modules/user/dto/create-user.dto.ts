import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsEmpty,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'firstName is required and must be a string',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Email is required',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Password is required',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  isSuperAdmin: boolean;
}
