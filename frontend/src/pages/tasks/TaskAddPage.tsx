import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTaskForm } from "@/contexts/task-form-context";
import { useCreateTask } from "@/hooks/task.hooks";
import { Label } from "@radix-ui/react-label";
import { ListPlus, X } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";

type FormValues = {
    title: string;
    description?: string;
    startDate?: string;
    dueDate?: string;
    priority: "low" | "medium" | "high" | "urgent";
};

const inputClass =
    "h-11 rounded-xl bg-white border border-slate-200 text-slate-900 " +
    "placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-primary/40 " +
    "focus-visible:border-primary transition-all";

const labelClass =
    "text-xs font-semibold uppercase tracking-wide text-slate-500";

const TaskAddPage = () => {
    const { togglefromadd, closefromadd } = useTaskForm();
    const createTask = useCreateTask();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<FormValues>({
        defaultValues: {
            title: "",
            description: "",
            priority: "medium",
            startDate: "",
            dueDate: "",
        },
    });

    const onSubmit = (values: FormValues) => {
        createTask.mutate(
            {
                title: values.title,
                description: values.description,
                priority: values.priority,
                startDate: values.startDate
                    ? new Date(values.startDate).toISOString()
                    : undefined,
                dueDate: values.dueDate
                    ? new Date(values.dueDate).toISOString()
                    : undefined,
            },
            {
                onSuccess: () => closefromadd(),
            }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            {/* Modal */}
            <div
                className="
                w-full max-w-[640px]
                bg-white/95 backdrop-blur-xl
                rounded-2xl
                border border-slate-200
                shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]
                overflow-hidden
                flex flex-col
                max-h-[90vh]
                "
            >
                {/* Header */}
                <div className="flex items-start justify-between p-6 border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                            Thêm công việc mới
                        </h2>
                        <p className="text-sm text-slate-500">
                            Điền thông tin bên dưới để bắt đầu theo dõi nhiệm vụ của bạn.
                        </p>
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        onClick={togglefromadd}
                        className="h-9 w-9 p-0 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex-1 overflow-y-auto p-6 space-y-6"
                >
                    {/* Title */}
                    <div className="space-y-2">
                        <Label className={labelClass}>Tiêu đề công việc</Label>
                        <Input
                            autoFocus
                            placeholder="Ví dụ: Thiết kế giao diện Dashboard"
                            className={inputClass}
                            {...register("title", { required: "Không được để trống tiêu đề" })}
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label className={labelClass}>Mô tả</Label>
                        <Textarea
                            placeholder="Thêm chi tiết về công việc này…"
                            className={`${inputClass} min-h-[110px] resize-none`}
                            {...register("description")}
                        />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className={labelClass}>Ngày bắt đầu</Label>
                            <Input type="date" className={inputClass} {...register("startDate")} />
                        </div>

                        <div className="space-y-2">
                            <Label className={labelClass}>Hạn hoàn thành</Label>
                            <Input
                                type="date"
                                className={inputClass}
                                {...register("dueDate", {
                                    validate: (v, f) =>
                                        !v || !f.startDate || new Date(v) >= new Date(f.startDate)
                                            ? true
                                            : "Hạn hoàn thành phải ≥ ngày bắt đầu",
                                })}
                            />
                            {errors.dueDate && (
                                <p className="text-sm text-red-500">
                                    {errors.dueDate.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Priority */}
                    <div className="space-y-2">
                        <Label className={labelClass}>Mức độ ưu tiên</Label>

                        <Controller
                            control={control}
                            name="priority"
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className={`${inputClass} max-w-48`}>
                                        <SelectValue placeholder="Chọn mức độ" />
                                    </SelectTrigger>

                                    <SelectContent className="bg-white border border-slate-200 shadow-lg rounded-xl">
                                        <SelectGroup>
                                            <SelectLabel className="text-slate-500">
                                                Mức độ
                                            </SelectLabel>

                                            {[
                                                { v: "low", l: "Low" },
                                                { v: "medium", l: "Medium" },
                                                { v: "high", l: "High" },
                                                { v: "urgent", l: "Urgent" },
                                            ].map((i) => (
                                                <SelectItem
                                                    key={i.v}
                                                    value={i.v}
                                                    className="
                                                    rounded-md
                                                    focus:bg-primary/10
                                                    data-[state=checked]:bg-primary/15
                                                    data-[state=checked]:font-semibold
                                                "
                                                >
                                                    {i.l}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={close}
                            className="text-slate-500 hover:text-slate-900"
                        >
                            Hủy
                        </Button>

                        <Button
                            type="submit"
                            disabled={createTask.isPending || !watch("title")}
                            className="
                                h-11 px-6 rounded-xl
                                bg-primary hover:bg-primary/90
                                text-white font-semibold
                                shadow-lg shadow-primary/30
                                transition-all
                                flex items-center gap-2
                            "
                        >
                            <ListPlus className="h-5 w-5" />
                            {createTask.isPending ? "Đang tạo..." : "Tạo nhiệm vụ"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskAddPage;
