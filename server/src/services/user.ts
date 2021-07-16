import { v4 } from "uuid";

export type UsersHash = { [code: string]: User };

export interface User {
  name: string;
  id: string;
  hand?: number;
}

export const createUser = (name: string): User => ({
  id: v4(),
  name,
});
