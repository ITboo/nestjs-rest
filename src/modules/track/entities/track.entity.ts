import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IsNullable } from 'src/validators/is-nullable';

const invalidRequestMessage =
  'Name, artistId, albumId, and duration are required';

export class Track {
  @IsUUID(4)
  id: string;

  @IsString()
  @IsNotEmpty({
    message: invalidRequestMessage,
  })
  name: string;

  @IsUUID(4)
  @IsNullable()
  @IsNotEmpty({
    message: invalidRequestMessage,
  })
  artistId: string | null;

  @IsUUID(4)
  @IsNullable()
  @IsNotEmpty({
    message: invalidRequestMessage,
  })
  albumId: string | null;

  @IsInt()
  @IsNotEmpty({
    message: invalidRequestMessage,
  })
  duration: number;
}
