import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import React from 'react'
import { Link } from 'react-router-dom'
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
        url: "/projects",
        icon: Search,
    },

    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]
const SidebarNav = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title} className={`
                            ${item.title == "Settings" ? "border-t border-black/10 mt-3 pt-3" : ""}
                        `}>
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
    )
}

export default SidebarNav
