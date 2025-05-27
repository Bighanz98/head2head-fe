import { useQuery } from "@tanstack/react-query";
import { getAllPlayers, getPlayersByTeamId, getPlayerById } from "@/lib/api/playerService";

export const usePlayersByTeamId = (teamId: number) => {
  return useQuery({
    queryKey: ["players", teamId],
    queryFn: () => getPlayersByTeamId(teamId),
    enabled: !!teamId, // kör bara när teamId finns
  });
};

export const usePlayerById = (playerId: number) => {
  return useQuery({
    queryKey: ["player", playerId],
    queryFn: () => getPlayerById(playerId),
    enabled: !!playerId, // kör bara när playerId finns
  });
};
