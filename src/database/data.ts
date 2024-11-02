import { Artist } from "src/modules/artist/entities/artist.entity";
import { User } from "src/modules/user/entities/user.entity";

interface Database {
  users: User[];
  artists: Artist[];
}
export const db: Database = {
  users: [],
  artists: [],
};