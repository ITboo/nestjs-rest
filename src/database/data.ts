import { User } from "src/modules/user/entities/user.entity";

interface Database {
  users: User[];
}
export const db: Database = {
  users: [],
};