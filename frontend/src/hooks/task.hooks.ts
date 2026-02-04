import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { taskService, type TaskListParams } from "@/services/tasskService";
import type { CreateTaskBody, Task } from "@/types/task.types";

export function useTasks(params: TaskListParams) {
    return useQuery({
        queryKey: QUERY_KEYS.TASKS.list(params),
        queryFn: () => taskService.getTasks(params),
        staleTime: 30_000,
        retry: false,
    });
}

export function useTaskDetail(id: string | number | null) {
    return useQuery({
        queryKey: QUERY_KEYS.TASKS.detail(id),
        queryFn: () => taskService.getTaskById(id),
        enabled: !!id,
        retry: false,
    });
}
export function useCreateTask() {
    const qc = useQueryClient();

    return useMutation({
        mutationKey: ["TASKS", "CREATE"],
        mutationFn: (body: CreateTaskBody) => {
            console.log("CREATE BODY:", body);
            return taskService.createTask(body);
        },

        onSuccess: (createdTask: Task) => {
            toast.success("Tạo task thành công", {
                position: "top-right",
                className: ""
            });
            qc.invalidateQueries({ queryKey: QUERY_KEYS.TASKS.all });
            qc.setQueryData(QUERY_KEYS.TASKS.detail(createdTask._id), createdTask);
        },

        onError: () => toast.error("Tạo task thất bại", {
            position: "top-right",
            className: ""
        }),
    });
}

export function useUpdateTask() {
    const qc = useQueryClient();

    return useMutation({
        mutationKey: ["TASKS", "UPDATE"],
        mutationFn: ({ id, body }: { id: string | number; body: Partial<CreateTaskBody> }) => {
            console.log("UPDATE:", { id, body });
            return taskService.updateTask(id, body);
        },

        onSuccess: (updatedTask: Task) => {
            toast.success("Cập nhật task thành công", {
                position: "top-right",
                className: ""
            });
            qc.invalidateQueries({ queryKey: QUERY_KEYS.TASKS.all });
            qc.setQueryData(QUERY_KEYS.TASKS.detail(updatedTask._id), updatedTask);
        },

        onError: (error) => toast.error(`Cập nhật task thất bại ,
        ${error.message}`, {
            position: "top-right",
            className: ""
        }),
    });
}

export function useDeleteTask() {
    const qc = useQueryClient();

    return useMutation({
        mutationKey: ["TASKS", "DELETE"],
        mutationFn: (id: string) => {
            console.log("DELETE ID:", id);
            return taskService.deleteTask(id);
        },

        onSuccess: () => {
            toast.success("Xoá task thành công", {
                position: "top-right",
                className: ""
            });
            qc.invalidateQueries({ queryKey: QUERY_KEYS.TASKS.all });
        },

        onError: () => toast.error("Xoá task thất bại", {
            position: "top-right",
            className: ""
        }),
    });
}
