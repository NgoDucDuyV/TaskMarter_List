import { http } from "@/lib/http";
import type { ApiResponse } from "@/types/task.types";
import type { TaskGroup } from "@/types/task.types";

export const groupService = {
  getGroups: async (params?: { teamId?: string }) => {
    const res = await http.get<ApiResponse<TaskGroup[]>>("/group", { params });
    return res.data.data;
  },

  createGroup: async (body: { teamId: string; name: string; description?: string }) => {
    const res = await http.post<ApiResponse<TaskGroup>>("/group", body);
    return res.data.data;
  },
};
