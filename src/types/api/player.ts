import { Team } from "./team";

export interface Player {
  playerId: number;
  playerName: string;
  playerAge: number;
  playerNation: string;
  playerPosition: string;
  playerPicUrl: string;

  playerAppearances: number;
  playerGoals: number;
  playerAssists: number;
  playerShots: number;
  playerPasses: number;
  playerTackles: number;
  playerSaves: number;
  playerCleanSheets: number;
  playerYellowCards: number;
  playerRedCards: number;

  playerTeamId: number;
  playerTeam: Team;
}