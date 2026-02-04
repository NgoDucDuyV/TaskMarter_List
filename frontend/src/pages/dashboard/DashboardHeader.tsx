import { SkeletonDemo } from "@/components/LoadingPage";
import { useSidebar } from "@/contexts/sidebar-context";
import { useTaskForm } from "@/contexts/task-form-context";
import { useTasks } from "@/hooks/task.hooks";
import { toast } from "sonner";
const DashboardHeaderPage = () => {
    const { togglefromadd } = useTaskForm();
    const { user } = useSidebar()
    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) return "Chào buổi sáng";
        if (hour >= 12 && hour < 18) return "Chào buổi chiều";
        if (hour >= 18 && hour < 22) return "Chào buổi tối";
        return "Chào buổi đêm";
    };
    const now = new Date();

    const formatter = new Intl.DateTimeFormat("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
        weekday: "long",
        day: "numeric",
        month: "numeric",
    });
    const formattedDate = formatter.format(now);

    const params = { page: 1, limit: 10 }
    const { isLoading, error, data } = useTasks(params);
    if (error) {
        toast(`${error}`)
    }

    console.log(data);
    
    return (
        <>
            <header className="flex flex-wrap justify-between items-end gap-6 mb-10">
                <div className="flex flex-col gap-2">
                    <h2 className="text-slate-900 dark:text-white text-4xl font-black tracking-tight">{getGreeting()}, {user?.displayName}
                    </h2>
                    <p className="text-slate-500 dark:text-[#9dabb9] text-lg">Hôm nay là Thứ Ba, {formattedDate}. Bạn có
                        { isLoading ? <SkeletonDemo /> : (<span className="text-primary font-bold"> 4 công việc đang chờ</span>) }
                        .</p>
                </div>
                <button onClick={() => togglefromadd()} className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Nhiệm vụ mới</span>
                </button>
            </header>
        </>
    )
}

export default DashboardHeaderPage
