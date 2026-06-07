import * as React from "react";
import { motion } from "framer-motion";
import { Home, Calendar, Plus, MessageSquare, User } from "lucide-react";
import { cn } from "@/utils/cn";

interface BottomNavbarProps {
    currentTab: string;
    onTabChange: (tab: string) => void;
    onCreateClick?: () => void;
}

export function BottomNavbar({ currentTab, onTabChange, onCreateClick }: BottomNavbarProps) {
    const tabs = [
        { id: "dashboard", label: "Home", icon: Home },
        { id: "bookings", label: "Bookings", icon: Calendar },
        { id: "create", label: "Create", icon: Plus, isFab: true },
        { id: "messages", label: "Messages", icon: MessageSquare },
        { id: "profile", label: "Profile", icon: User },
    ];

    return (
        <nav
            className="lg:hidden fixed bottom-0 left-0 right-0 h-16 border-t border-gray-200 bg-white/95 backdrop-blur-md z-40 flex items-center justify-around px-2 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.03)]"
            role="navigation"
            aria-label="Mobile Navigation Bar"
        >
            {tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = currentTab === tab.id;

                if (tab.isFab) {
                    return (
                        <div key={tab.id} className="relative -top-3 flex flex-col items-center">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onCreateClick || (() => onTabChange("create"))}
                                className="w-12 h-12 rounded-full bg-[#5B3DF5] text-white flex items-center justify-center shadow-lg shadow-[#5B3DF5]/30 focus:outline-none focus:ring-4 focus:ring-[#5B3DF5]/20 hover:bg-[#4a2ee0] transition-colors"
                                aria-label="Create item"
                            >
                                <Plus className="h-6 w-6 stroke-[2.5]" />
                            </motion.button>
                            <span className="text-[10px] font-medium text-gray-500 mt-1">
                                {tab.label}
                            </span>
                        </div>
                    );
                }

                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className="flex flex-col items-center justify-center w-14 h-full relative"
                        aria-label={tab.label}
                    >
                        <div className="relative">
                            <IconComponent
                                className={cn(
                                    "h-5.5 w-5.5 transition-colors duration-200",
                                    isActive ? "text-[#5B3DF5]" : "text-gray-400"
                                )}
                            />
                            {isActive && (
                                <motion.span
                                    layoutId="activeTabIndicator"
                                    className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#5B3DF5]"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </div>
                        <span
                            className={cn(
                                "text-[10px] font-medium mt-1 transition-colors duration-200",
                                isActive ? "text-[#5B3DF5] font-semibold" : "text-gray-400"
                            )}
                        >
                            {tab.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
}
