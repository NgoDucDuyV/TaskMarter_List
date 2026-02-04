import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { groupService } from "@/services/groupService";


export function useGroups(teamId?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.GROUPS.list({ teamId }),
    queryFn: () => groupService.getGroups({ teamId }),
    retry: false,
    staleTime: 30_000,
  });
}

export function useCreateGroup() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["GROUPS", "CREATE"],
    mutationFn: (body: { teamId: string; name: string; description?: string }) => {
      return groupService.createGroup(body);
    },
    onSuccess: () => {
      toast.success("Tạo nhóm thành công", { position: "top-right" });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.GROUPS.all });
    },

    onError: (error) => {
      console.error("Create group error:", error);
      const msg = error instanceof Error ? error.message : "Tạo nhóm thất bại";
      toast.error(msg, { position: "top-right" });
    },
  });
}
