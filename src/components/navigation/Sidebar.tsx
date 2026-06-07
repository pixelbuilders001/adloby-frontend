import * as React from "react";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Megaphone,
    Printer,
    Calendar,
    MessageSquare,
    Settings,
    ChevronLeft,
    ChevronRight,
    Boxes
} from "lucide-react";
import { cn } from "@/utils/cn";

interface SidebarProps {
    currentTab: string;
    onTabChange: (tab: string) => void;
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ currentTab, onTabChange, isCollapsed, setIsCollapsed }: SidebarProps) {
    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "advertising", label: "Advertising", icon: Megaphone },
        { id: "printing", label: "Printing", icon: Printer },
        { id: "bookings", label: "Bookings", icon: Calendar },
        { id: "messages", label: "Messages", icon: MessageSquare },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    return (
        <motion.aside
            animate={{ width: isCollapsed ? 76 : 260 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={cn(
                "hidden lg:flex flex-col h-screen sticky top-0 border-r border-gray-250 bg-white/90 backdrop-blur-md z-30 transition-colors duration-200"
            )}
            aria-label="Desktop Sidebar Navigation"
        >
            {/* Sidebar Header */}
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
                <div className="flex items-center gap-2 overflow-hidden">
                    <div className="h-9 w-9 rounded-lg bg-[#5B3DF5] flex items-center justify-center text-white flex-shrink-0">
                        <Boxes className="h-5 w-5" />
                    </div>
                    {!isCollapsed && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="font-black text-lg tracking-tight bg-gradient-to-r from-[#5B3DF5] to-[#16A34A] bg-clip-text text-transparent"
                        >
                            ADLOBY
                        </motion.span>
                    )}
                </div>
                {!isCollapsed && (
                    <button
                        onClick={() => setIsCollapsed(true)}
                        className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                        aria-label="Collapse sidebar"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                )}
            </div>

            {/* Navigation Menu Links */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = currentTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-3.5 rounded-xl font-medium text-sm transition-all relative group",
                                isActive
                                    ? "text-[#5B3DF5] font-semibold"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            )}
                            aria-current={isActive ? "page" : undefined}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="sidebarActiveBackground"
                                    className="absolute inset-0 bg-[#5B3DF5]/5 rounded-xl border-l-3 border-[#5B3DF5]"
                                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                />
                            )}
                            <div className="relative flex items-center justify-center z-10">
                                <IconComponent
                                    className={cn(
                                        "h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-105",
                                        isActive ? "text-[#5B3DF5]" : "text-gray-400"
                                    )}
                                />
                            </div>
                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="z-10 truncate"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                            {isCollapsed && (
                                <div className="absolute left-16 hidden group-hover:block bg-gray-900 text-white text-xs rounded-md px-2.5 py-1.5 whitespace-nowrap shadow-md z-50 pointer-events-none">
                                    {item.label}
                                </div>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Collapsed Toggle Footer */}
            {isCollapsed && (
                <div className="p-4 border-t border-gray-200 flex justify-center">
                    <button
                        onClick={() => setIsCollapsed(false)}
                        className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-905 transition-colors"
                        aria-label="Expand sidebar"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            )}
        </motion.aside>
    );
}
