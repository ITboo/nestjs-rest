import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

const invalidRequestMessage = 'Name and grammy are required!';

export class Artist {
  @IsUUID(4)
  id: string;

  @IsString()
  @IsNotEmpty({ message: invalidRequestMessage })
  name: string;

  @IsBoolean()
  @IsNotEmpty({ message: invalidRequestMessage })
  grammy: boolean;
}