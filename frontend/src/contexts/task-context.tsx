/* eslint-disable react-refresh/only-export-components */
// src/contexts/task-context.tsx
import type { Task } from "@/types/task.types";
import React, { createContext, useContext, useMemo, useState } from "react";

export type TaskStatus = "todo" | "in_progress" | "blocked" | "done";
export type TaskStatusFilter = "all" | TaskStatus;

type TaskContextType = {
    // Filter (Tabs)
    status: TaskStatusFilter;
    setStatus: (v: TaskStatusFilter) => void;

    // Tasks list (state global)
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;

    // Dialog tạo task
    isCreateOpen: boolean;
    openCreate: () => void;
    closeCreate: () => void;
    toggleCreate: () => void;

    // Dialog sửa task
    editingId: string | null;
    openEdit: (id: string) => void;
    closeEdit: () => void;

    // Helper tiện dùng
    filteredTasks: Task[];
};

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [status, setStatus] = useState<TaskStatusFilter>("all");

    const [tasks, setTasks] = useState<Task[]>([]);

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const openCreate = () => setIsCreateOpen(true);
    const closeCreate = () => setIsCreateOpen(false);
    const toggleCreate = () => setIsCreateOpen((p) => !p);

    const openEdit = (id: string) => setEditingId(id);
    const closeEdit = () => setEditingId(null);

    const filteredTasks = useMemo(() => {
        if (status === "all") return tasks;
        return tasks.filter((t) => t.status === status);
    }, [tasks, status]);

    const value = useMemo<TaskContextType>(
        () => ({
            status,
            setStatus,

            tasks,
            setTasks,

            isCreateOpen,
            openCreate,
            closeCreate,
            toggleCreate,

            editingId,
            openEdit,
            closeEdit,

            filteredTasks,
        }),
        [status, tasks, isCreateOpen, editingId, filteredTasks]
    );

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
    const ctx = useContext(TaskContext);
    if (!ctx) throw new Error("useTask must be used within <TaskProvider />");
    return ctx;
};
