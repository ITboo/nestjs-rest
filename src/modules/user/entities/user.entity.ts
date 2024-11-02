import { IsInt, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';

const invalidRequestMsg = 'Login and password are required';

export class User {
  @IsUUID(4)
  id: string;

  @IsString()
  @IsNotEmpty({ message: invalidRequestMsg })
  login: string;

  @IsString()
  @IsNotEmpty({ message: invalidRequestMsg })
  password: string;

  @IsInt()
  @Min(1)
  version: number;

  @IsInt()
  createdAt: number;

  @IsInt()
  updatedAt: number;
}