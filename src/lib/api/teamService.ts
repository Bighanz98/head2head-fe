import { request } from "@/lib/request";
import { Team } from "@/types/api";

export const getAllTeams = () => {
  return request<Team[]>("/Team/GetAllTeams", { method: "GET" });
};
