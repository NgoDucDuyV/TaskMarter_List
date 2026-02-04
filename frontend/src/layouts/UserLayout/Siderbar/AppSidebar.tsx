import {
    Sidebar,
    SidebarContent,
} from "@/components/ui/sidebar"
import HeaderSiderbar from "./HeaderSiderbar"
import FooterSidebar from "./FooterSidebar"
import SidebarNav from "./SidebarNav"
import { useSidebar } from "@/contexts/sidebar-context";
export function AppSidebar() {
    const { isOpen } = useSidebar();
    return (
        <Sidebar variant="sidebar"
            collapsible="none"
            className={`
            min-w-62
            max-w-62
            border-r border-slate-200 dark:border-slate-800
            flex flex-col
            h-screen
            sticky top-0
            transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0 " : "-translate-x-full absolute"}
        `}>
            <SidebarContent className="bg-[#0000] min-w-[240px] relative">
                {/* header */}
                <HeaderSiderbar />

                {/* sidebar Nav */}
                <SidebarNav />
                {/* footer */}
                <FooterSidebar />
            </SidebarContent>
        </Sidebar>
    )
}