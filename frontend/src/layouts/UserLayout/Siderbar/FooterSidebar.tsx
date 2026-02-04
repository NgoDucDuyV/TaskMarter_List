import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import React from 'react'
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';

const FooterSidebar = () => {
    const { SignOut } = useAuthStore();
    return (
        <SidebarFooter className="mt-auto w-full">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        onClick={() => SignOut()}
                        className="
                                text-red-500
                                hover:text-red-600
                                hover:bg-red-500/10
                                data-[active=true]:bg-red-500/10
                                "
                    >
                        <LogOut className="size-4" />
                        <span>Đăng xuất</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl">
                <p className="text-xs font-bold text-primary mb-1">GÓI PRO</p>
                <p className="text-xs text-slate-500 dark:text-[#9dabb9] mb-3">Mở khóa phân tích nâng cao và cộng tác
                    nhóm.</p>
                <button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-opacity">Nâng
                    cấp ngay</button>
            </div>
        </SidebarFooter>
    )
}

export default FooterSidebar
