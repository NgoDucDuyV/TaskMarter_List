export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "todo" | "in_progress" | "blocked" | "done";

export type UserLite = {
    _id: string;
    email: string;
    username: string;
};

export type Task = {
    _id: string | number;

    ownerUserId: string | null;
    teamId: string | null;
    groupId: string | null;
    folderId: string | null;
    parentTaskId: string | null;

    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;

    startDate: string | null;
    dueDate: string | null;
    completedAt: string | null;

    createdBy: UserLite; // populate object
    isArchived: boolean;
    orderNum: number;

    createdAt: string;
    updatedAt: string;
};

export type TaskGroup = {
    _id: string | number;
    teamId: string;
    name: string;
    description?: string | null;
    createdBy: UserLite | string;
    status: "active" | "archived";

    createdAt: string;
    updatedAt: string;
};


export type ApiResponse<T> = {
    success: boolean;
    data: T;
};

// payload gửi lên khi tạo mới
export type CreateTaskBody = {
    title: string;
    description?: string;
    priority: TaskPriority;
    startDate?: string; // ISO string
    dueDate?: string;   // ISO string
    status?: TaskStatus;
};
