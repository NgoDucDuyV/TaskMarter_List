import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTask, type TaskStatusFilter } from '@/contexts/task-context'

const TaskFilter = () => {
    const { status, setStatus } = useTask();

    return (
        <>
            <Tabs value={status} onValueChange={(v) => setStatus(v as TaskStatusFilter)}>
                <TabsList
                    className="
                        flex gap-1 mb-8 p-1
                        bg-slate-100 dark:bg-slate-800/50
                        rounded-xl w-fit
                    "
                >
                    <TabsTrigger
                        value="all"
                        className="
                            px-6 py-2 text-sm font-semibold rounded-lg
                            data-[state=active]:bg-white
                            dark:data-[state=active]:bg-card-dark
                            data-[state=active]:text-primary
                            dark:data-[state=active]:text-white
                            data-[state=active]:shadow-sm
                            text-slate-500 dark:text-[#9dabb9]
                        "
                    >
                        Tất cả
                    </TabsTrigger>
                    <TabsTrigger value="todo">Cần làm</TabsTrigger>
                    <TabsTrigger value="in_progress">Đang thực hiện</TabsTrigger>
                    <TabsTrigger value="blocked">Bị chặn</TabsTrigger>
                    <TabsTrigger value="done">Đã xong</TabsTrigger>
                </TabsList>
            </Tabs>
        </>
    )
}

export default TaskFilter
