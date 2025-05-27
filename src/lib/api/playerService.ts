import { request } from "@/lib/request";
import { Player } from "@/types/api";

export const getAllPlayers = () => {
  return request<Player[]>("/Player/GetAllPlayers", { method: "GET" });
};

export const getPlayersByTeamId = (id: number) => {
  return request<Player[]>(`/Player/GetPlayersByTeam/${id}`, { method: "GET" });
};

export const getPlayerById = (id: number) => {
  return request<Player>(`/Player/GetById${id}`, { method: "GET" });
};

// Ny funktion för att jämföra två spelare
export interface ComparePlayerStat {
  statName: string;
  player1Value: number;
  player2Value: number;
  player1Percent: number;
  player2Percent: number;
}

export interface ComparePlayersResponse {
  player1Id: number;
  player1Name: string;
  player2Id: number;
  player2Name: string;
  stats: ComparePlayerStat[];
}

export const getComparePlayers = (player1Id: number, player2Id: number) => {
  const url = `/Player/ComparePlayers?player1Id=${player1Id}&player2Id=${player2Id}`;
  return request<ComparePlayersResponse>(url, { method: "GET" });
};
