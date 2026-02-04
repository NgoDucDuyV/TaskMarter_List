/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { teamService } from "@/services/teamService";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { toast } from "sonner";

export function useTeams(mine = true) {
  return useQuery({ queryKey: QUERY_KEYS.TEAMS.list({ mine }), queryFn: () => teamService.getTeams({ mine }) });
}

export function useCreateTeam() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["TEAMS", "CREATE"],
    mutationFn: (body: { name: string; visibility?: string }) => teamService.createTeam(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.TEAMS.all });
      toast.success("Tạo team thành công");
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || err?.message || "Tạo team thất bại";
      toast.error(msg);
    },
  });
}
