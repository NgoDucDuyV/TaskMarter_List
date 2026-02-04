import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { Navigate, Outlet } from "react-router-dom"
import TaskAddPage from "@/pages/tasks/TaskAddPage"
import { useSidebar } from "@/contexts/sidebar-context";
import { cn } from "@/lib/utils";
import { useTaskForm } from "@/contexts/task-form-context";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { useEffect } from "react";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import { QUERY_KEYS } from "@/lib/queryKeys";
import TaskEditPage from "@/pages/tasks/TaskEditPage";
export default function Layout() {
    const { SetUser, toggle } = useSidebar();
    const {
        isOpenfromAdd, isOpenfromEdit,
        idTask
    } = useTaskForm();


    const { isPending, isError, data } = useQuery({
        queryKey: QUERY_KEYS.USER.uerFrofile,
        queryFn: userService.GetUserProfile,
        retry: false,
    });

    useEffect(() => {
        if (isError) toast.error("Đã có lỗi xảy ra khi tải thông tin người dùng.");
        if (data?.data) {
            SetUser(data.data);
        };
    }, [isError, data]);
    if (isPending) return <Loader />;
    
    if (isError) return <Navigate to="/signin" replace />;

    return (
        <SidebarProvider className="flex min-h-screen"
        >
            <AppSidebar />
            {isOpenfromAdd && <TaskAddPage />}
            {isOpenfromEdit && <TaskEditPage idTask={idTask} />}
            {/* content */}
            <SidebarTrigger className="text-black mt-1 ml-1" onClick={() => toggle()} />
            <main className={cn(
                "flex-1 py-8 pr-8 lg:py-12 lg:pr-8 max-w-7xl mx-auto w-full",
                "transition-transform duration-300 ease-in-out"
            )
            }>
                <Outlet />
            </main>
        </SidebarProvider>
    )
}