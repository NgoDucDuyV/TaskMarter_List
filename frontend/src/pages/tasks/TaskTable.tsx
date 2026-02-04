import { useEffect, useMemo } from "react";
import { useDeleteTask, useTasks } from "@/hooks/task.hooks";
import TaskStatusSelect from "@/components/TaskStatusSelect";
import Loader from "@/components/Loader";
import { BookCopy, EllipsisVertical, Eye, FileCog, Trash } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useTaskForm } from "@/contexts/task-form-context";
import { toast } from "sonner";
import { useTask } from "@/contexts/task-context";
import type { TaskListParams } from "@/services/tasskService";




const priorityMeta: Record<string, { label: string; className: string }> = {
    low: {
        label: "Thấp",
        className:
            "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    medium: {
        label: "Trung bình",
        className:
            "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    },
    high: {
        label: "Cao",
        className:
            "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    },
    urgent: {
        label: "Khẩn cấp",
        className:
            "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
    },
};

function formatDateVN(iso?: string | null) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
    });
}

function formatTimeVN(iso?: string | null) {
    if (!iso) return "";
    return new Date(iso).toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

function getInitials(name?: string) {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? "U";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
}
const TaskTable = () => {
    const { tasks, setTasks, status } = useTask()
    const {
        toopenfromedit,
        setIdTask,
    } = useTaskForm()
    // lấy list ták

    const params = useMemo(() => {
        const p: TaskListParams = { page: 1, limit: 10 };
        if (status && status !== "all") p.status = status;
        return p;
    }, [status]);

    const { data, isPending, isError } = useTasks(params);

    const deleteTask = useDeleteTask()

    const handlDeleteTask = (id: string) => {
        if (confirm("bạn có chắc muốn xóa task này")) {
            deleteTask.mutate(id)
        }
    }
    
    useEffect(() => {
        if (!data) return;
        // backend returns paginated data { items, total, page, limit }
        if (Array.isArray(data)) {
            setTasks(data);
            return;
        }
        
        if (Array.isArray(data.items)) {
            setTasks(data.items);
            return;
        }
        setTasks([]);
    }, [data, setTasks])
    if (isPending) return <Loader />;

    if (isError) return toast.error("Lỗi tải lại trang", {
        position: "top-left"
    })

    return (
        <div className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#9dabb9]">
                            Nhiệm vụ
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#9dabb9]">
                            Trạng thái
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#9dabb9]">
                            Ưu tiên
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#9dabb9]">
                            Hạn chót
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#9dabb9]">
                            Người thực hiện
                        </th>
                        <th className="px-6 py-4" />
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {tasks.length === 0 ? (
                        <tr>
                            <td
                                className="px-6 py-6 text-sm text-slate-500 dark:text-[#9dabb9]"
                                colSpan={6}
                            >
                                Chưa có task nào.
                            </td>
                        </tr>
                    ) : (
                        tasks.map((item) => {
                            const isDone = item.status === "done";
                            const pr = priorityMeta[item.priority] ?? priorityMeta.medium;

                            // “người thực hiện”: bạn chưa có assignee => dùng createdBy tạm
                            const person = item.createdBy;
                            const initials = getInitials(person?.username);

                            return (
                                <tr
                                    key={item._id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group"
                                >
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={[
                                                    "size-5 rounded border-2 flex items-center justify-center min-w-5",
                                                    isDone
                                                        ? "border-primary bg-primary text-white"
                                                        : "border-slate-300 dark:border-slate-600",
                                                ].join(" ")}
                                                title={isDone ? "Đã xong" : "Chưa xong"}
                                            >
                                                {isDone ? (
                                                    <span className="material-symbols-outlined text-xs font-bold">
                                                        check
                                                    </span>
                                                ) : null}
                                            </div>

                                            <div>
                                                <p
                                                    className={[
                                                        "text-sm font-bold",
                                                        isDone
                                                            ? "text-slate-400 dark:text-slate-500 line-through"
                                                            : "text-slate-900 dark:text-white",
                                                    ].join(" ")}
                                                >
                                                    {item.title}
                                                </p>

                                                <p
                                                    className={[
                                                        "text-xs",
                                                        isDone
                                                            ? "text-slate-400 dark:text-slate-600"
                                                            : "text-slate-500 dark:text-[#9dabb9]",
                                                    ].join(" ")}
                                                >
                                                    {isDone && item.completedAt
                                                        ? `Đã hoàn thành lúc ${formatTimeVN(item.completedAt)}`
                                                        : item.description || "—"}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-5">
                                        {/* Status select */}
                                        <div className="max-w-55">
                                            <TaskStatusSelect id={String(item._id)} value={item.status} />
                                        </div>
                                    </td>

                                    <td className="px-6 py-5">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${pr.className}`}
                                        >
                                            {pr.label}
                                        </span>
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span
                                                className={[
                                                    "text-sm font-semibold",
                                                    isDone
                                                        ? "text-slate-400 dark:text-slate-500"
                                                        : "dark:text-white",
                                                ].join(" ")}
                                            >
                                                {item.dueDate ? `${formatDateVN(item.dueDate)} Tháng` : "—"}
                                            </span>
                                            <span
                                                className={[
                                                    "text-[10px]",
                                                    isDone
                                                        ? "text-slate-400 dark:text-slate-600"
                                                        : "text-slate-400 dark:text-slate-500",
                                                ].join(" ")}
                                            >
                                                {isDone
                                                    ? item.completedAt
                                                        ? `Xong lúc ${formatTimeVN(item.completedAt)}`
                                                        : "Đã xong"
                                                    : item.dueDate
                                                        ? `${formatTimeVN(item.dueDate)}`
                                                        : ""}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-5">
                                        <div
                                            className="size-8 rounded-full border-2 border-white dark:border-card-dark bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500 dark:text-slate-400"
                                            title={person?.username ?? ""}
                                        >
                                            {initials}
                                        </div>
                                    </td>

                                    <td className="px-6 py-5 text-right">
                                        <HoverCard openDelay={10} closeDelay={100}>
                                            <HoverCardTrigger asChild>
                                                <Button variant="link" className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400">
                                                    <EllipsisVertical />
                                                </Button>
                                            </HoverCardTrigger>
                                            <HoverCardContent
                                                align="end"
                                                sideOffset={8}
                                                className="
                                                w-44 p-1
                                                bg-white dark:bg-slate-900
                                                border border-slate-200 dark:border-slate-700
                                                rounded-xl shadow-lg
                                                "
                                            >
                                                {/* Deails */}
                                                <button
                                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm
                                                    text-slate-700 dark:text-slate-200
                                                    hover:bg-slate-100 dark:hover:bg-slate-800"
                                                >
                                                    <span className="material-symbols-outlined text-base">
                                                        <Eye />
                                                    </span>
                                                    Xem Chi Tiết
                                                </button>
                                                {/* Edit */}
                                                <button
                                                    onClick={() => {
                                                        setIdTask(item._id)
                                                        toopenfromedit()
                                                    }}
                                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm
                                                    text-slate-700 dark:text-slate-200
                                                    hover:bg-slate-100 dark:hover:bg-slate-800"
                                                >
                                                    <span className="material-symbols-outlined text-base">
                                                        <FileCog />
                                                    </span>
                                                    Chỉnh sửa
                                                </button>

                                                {/* Duplicate */}
                                                <button
                                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm
                                                    text-slate-700 dark:text-slate-200
                                                    hover:bg-slate-100 dark:hover:bg-slate-800"
                                                >
                                                    <span className="material-symbols-outlined text-base">
                                                        <BookCopy />
                                                    </span>
                                                    Nhân bản
                                                </button>

                                                <div className="my-1 h-px bg-slate-200 dark:bg-slate-700" />

                                                {/* Delete */}
                                                <button
                                                    onClick={() => handlDeleteTask(String(item._id))}
                                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm
                                                    text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                                                >
                                                    <span className="material-symbols-outlined text-base">
                                                        <Trash />
                                                    </span>
                                                    Xóa
                                                </button>
                                            </HoverCardContent>
                                        </HoverCard>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;
