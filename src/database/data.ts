import { Artist } from "src/modules/artist/entities/artist.entity";
import { Track } from "src/modules/track/entities/track.entity";
import { User } from "src/modules/user/entities/user.entity";

interface Database {
  users: User[];
  artists: Artist[];
  tracks: Track[];
}
export const db: Database = {
  users: [],
  artists: [],
  tracks: [],
};