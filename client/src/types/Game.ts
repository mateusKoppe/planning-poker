export interface Game {
  name: string;
  type: number;
  code: string;
  users: { id: string, name: string; hand: number | null }[];
  revealed: boolean;
}
