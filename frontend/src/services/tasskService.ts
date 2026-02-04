import { http } from "@/lib/http";
import type { ApiResponse, Task, CreateTaskBody } from "@/types/task.types";

export type TaskListParams = {
    q?: string;
    status?: string;
    priority?: string;
    page?: number;
    limit?: number;
};

export type TaskListData = {
    items: Task[];
    total: number;
    page: number;
    limit: number;
};

export const taskService = {
    // GET /tasks?...
    getTasks: async (params: TaskListParams) => {
        const res = await http.get<ApiResponse<TaskListData>>("/task", { params });
        return res.data.data; 
    },

    // GET /task/:id
    getTaskById: async (id: string | number | null) => {
        const res = await http.get<ApiResponse<Task>>(`/task/${id}`);
        return res.data.data; 
    },

    // POST /task
    createTask: async (body: CreateTaskBody) => {
        const res = await http.post<ApiResponse<Task>>("/task", body);
        return res.data.data; 
    },

    // PUT /task/:id
    updateTask: async (id: string | number, body: Partial<CreateTaskBody>) => {
        const res = await http.put<ApiResponse<Task>>(`/task/${id}`, body);
        return res.data.data;
    },

    // DELETE /task/:id
    deleteTask: async (id: string) => {
        const res = await http.delete<ApiResponse<{ deleted: boolean }>>(`/task/${id}`);
        return res.data.data;
    },

    // Task Assignments
    assignMember: async (taskId: string, userId: string) => {
        const res = await http.post(`/assign/${taskId}/assign`, { userId });
        return res.data.data;
    },

    unassignMember: async (taskId: string, assigneeId: string) => {
        const res = await http.delete(`/assign/${taskId}/assign/${assigneeId}`);
        return res.data.data;
    },

    getTaskAssignees: async (taskId: string, params?: { page?: number; limit?: number }) => {
        const res = await http.get(`/assign/${taskId}/assignees`, { params });
        return res.data.data;
    },

    updateTaskAssignees: async (taskId: string, userIds: string[]) => {
        const res = await http.put(`/assign/${taskId}/assignees`, { userIds });
        return res.data.data;
    },
};
