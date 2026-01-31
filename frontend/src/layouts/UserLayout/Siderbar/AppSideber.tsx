import { Calendar, ChevronDown, Home, Inbox, Search, Settings } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"
import { useAuthStore } from "@/stores/useAuthStore"
// Menu items.
const items = [
    {
        title: "Tổng Quan",
        url: "/",
        icon: Home,
    },
    {
        title: "Danh Sách Công Việc",
        url: "/taskPage",
        icon: Inbox,
    },
    {
        title: "Lịch",
        url: "/calendarPage",
        icon: Calendar,
    },
    {
        title: "Dự Án",
        url: "#",
        icon: Search,
    },

    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export function AppSidebar() {
    const { user } = useAuthStore();

    if (user) {
        console.log(user);
    }
    return (
        <Sidebar variant="sidebar"
            collapsible="none"
            className="w-72 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0 bg-background-light dark:bg-background-dark">
            <SidebarContent className="bg-[#0000] min-w-[240px] relative">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton>
                                        Select Workspace
                                        <ChevronDown className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                                    <DropdownMenuItem>
                                        <span>Acme Inc</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span>Acme Corp.</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                    <div className="flex items-center gap-3">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 border-2 border-primary" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASIfLrKkU-FdEi3AA0iv19fzTONimvo_Oxp5iQzfUrUkzn_eaOe8qTE7noj3C4ES7v7-67EBTCyV9yEvqLfUMhTNrdQ2TYwpfWYWHOQTSw9m2DZPJF9swqvY2Gg6zVbSqlUPX_fllSsWQAD4yFRk3PuLygd8Yrdai8C91LTThRqsx-GKGz8oAgXjiE4QYwjzxJe7tNaZ26HyNagsLMn_u7GrB9Z4YfmKYADcxNB7YU_lRnWSyc92Pw3eJSVTP8S0qyUiKXb1mtCoX8")' }}>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-slate-900 dark:text-white text-base font-bold leading-tight">{ user?.username }
                            </h1>
                            <p className="text-slate-500 dark:text-[#9dabb9] text-xs font-medium">Chuyên gia năng suất</p>
                        </div>
                    </div>
                </SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarFooter className="sticky bottom-0 w-full">
                    <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl">
                        <p className="text-xs font-bold text-primary mb-1">GÓI PRO</p>
                        <p className="text-xs text-slate-500 dark:text-[#9dabb9] mb-3">Mở khóa phân tích nâng cao và cộng tác
                            nhóm.</p>
                        <button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-opacity">Nâng
                            cấp ngay</button>
                    </div>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    )
}