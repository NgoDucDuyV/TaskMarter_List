/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

import { type User } from "@/types/user";
type SidebarContextType = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    user: User | null;
    SetUser: (userData: User) => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProviderContext({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    
    
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen((prev) => !prev);
    const SetUser = (userData: User) => setUser(userData);
    
    return (
        <SidebarContext.Provider value={{ isOpen, open, close, toggle , user, SetUser}}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const ctx = useContext(SidebarContext);
    if (!ctx) {
        throw new Error("useSidebar must be used within SidebarProvider");
    }
    return ctx;
}
