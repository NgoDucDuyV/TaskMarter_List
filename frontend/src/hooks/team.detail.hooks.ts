import { useQuery } from "@tanstack/react-query";
import { teamService } from "@/services/teamService";
import { QUERY_KEYS } from "@/lib/queryKeys";

export function useTeam(id?: string | null) {
  return useQuery({ queryKey: QUERY_KEYS.TEAMS.detail(id), queryFn: () => teamService.getTeamById(String(id)), enabled: !!id });
}

export function useTeamMembers(teamId?: string) {
  return useQuery({ queryKey: QUERY_KEYS.TEAMS.members(teamId), queryFn: () => teamService.getTeamMembers(String(teamId)), enabled: !!teamId });
}
