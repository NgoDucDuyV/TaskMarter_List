
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUpdateTask } from "@/hooks/task.hooks";
import { useTask } from "@/contexts/task-context";
import type { TaskStatus } from "@/types/task.types";

type Props = {
  id: string;
  value: TaskStatus;
};

const OPTIONS: { v: TaskStatus; l: string }[] = [
  { v: "todo", l: "Cần làm" },
  { v: "in_progress", l: "Đang thực hiện" },
  { v: "blocked", l: "Bị chặn" },
  { v: "done", l: "Đã xong" },
];

export default function TaskStatusSelect({ id, value }: Props) {
  const update = useUpdateTask();
  const { setTasks } = useTask();

  const onChange = (v: string) => {
    const newStatus = v as TaskStatus;

    // optimistic update
    setTasks((prev) => prev.map((t) => (String(t._id) === id ? { ...t, status: newStatus } : t)));

    update.mutate(
      { id, body: { status: newStatus } },
      {
        onError: () => {
          // rollback: refetch or revert (simple approach: invalidate query handled by hook)
        },
      },
    );
  };

  const isBusy = ((update as unknown) as { isPending?: boolean }).isPending ?? false;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="max-w-50">
        <SelectValue placeholder={OPTIONS.find((o) => o.v === value)?.l ?? "Trạng thái"} />
      </SelectTrigger>

      <SelectContent className="bg-white border border-slate-200 shadow-lg rounded-xl">
        {OPTIONS.map((o) => (
          <SelectItem key={o.v} value={o.v} disabled={isBusy}>
            {o.l}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
