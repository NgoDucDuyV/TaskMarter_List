import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSideber"
import { Outlet } from "react-router-dom"
import TaskAddPage from "@/pages/tasks/TaskAddPage"
import { siderberStore } from "@/stores/siderbarStore";
// import TaskAddPage from './../../../pages/tasks/TaskAddPage';

export default function Layout() {
    const { isOpen } = siderberStore();
    return (
        <SidebarProvider className="flex min-h-screen">
                <AppSidebar />
            {isOpen && <TaskAddPage />}
            <SidebarTrigger className="text-black mt-1 ml-1" />
            {/* content */}
            <main className="flex-1 p-8 lg:p-12 max-w-7xl mx-auto w-full">
                <Outlet/>
            </main>
        </SidebarProvider>
    )
}