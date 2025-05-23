import { Player } from "./player";

export interface Team {
  teamId: number;
  teamName: string;
  teamLogoUrl: string;
  players: Player[];
}
