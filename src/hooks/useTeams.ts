import { useQuery } from "@tanstack/react-query";
import { getAllTeams } from "@/lib/api/teamService";

export const useTeams = () => {
  return useQuery({
    queryKey: ["teams"],
    queryFn: getAllTeams,
  });
};