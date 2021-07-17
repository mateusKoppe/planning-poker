import { v4 } from "uuid";

export interface User {
  name: string;
  id: string;
  hand?: number;
}

export const createUser = (name: string): User => ({
  id: v4(),
  name,
});
