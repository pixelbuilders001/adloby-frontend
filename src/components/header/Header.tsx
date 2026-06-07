import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu,
    MapPin,
    Bell,
    Search,
    SlidersHorizontal,
    ChevronDown,
    User,
    Boxes
} from "lucide-react";
import { cn } from "@/utils/cn";
import { ThemeToggle } from "@/components/ThemeToggle";

interface HeaderProps {
    currentLocation: string;
    onLocationChange: (loc: string) => void;
    searchValue: string;
    onSearchChange: (val: string) => void;
    onMenuToggle?: () => void;
}

export function Header({
    currentLocation,
    onLocationChange,
    searchValue,
    onSearchChange,
    onMenuToggle
}: HeaderProps) {
    const [isLocDropdownOpen, setIsLocDropdownOpen] = React.useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);

    const locations = ["Gorakhpur", "Lucknow", "Delhi NCR", "Mumbai", "Bengaluru"];

    const notifications = [
        { id: 1, text: "Your booking for Golghar Chowk is confirmed!", time: "2 hours ago", unread: true },
        { id: 2, text: "New printing services available now near you.", time: "1 day ago", unread: false },
        { id: 3, text: "Secured payment processed successfully.", time: "2 days ago", unread: false }
    ];

    return (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 w-full transition-colors duration-200 dark:bg-zinc-950/95 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Header Row */}
                <div className="flex h-16 items-center justify-between gap-4">

                    {/* Mobile: Hamburger and Logo */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onMenuToggle}
                            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
                            aria-label="Toggle mobile drawer"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <div className="flex items-center gap-1.5 font-black text-xl tracking-tight text-[#5B3DF5] cursor-pointer">
                            <div className="h-8 w-8 rounded-lg bg-[#5B3DF5] flex items-center justify-center text-white lg:hidden">
                                <Boxes className="h-4.5 w-4.5" />
                            </div>
                            <div className="flex flex-col select-none">
                                <span className="leading-tight text-lg sm:text-xl font-extrabold tracking-tight">Adloby</span>
                                <span className="text-[10px] text-gray-400 font-medium tracking-normal leading-none -mt-0.5 max-sm:hidden">
                                    Ad & Print Solutions
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Section: Location Selector, Notification, and User Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">

                        {/* Theme Toggle (Utility) */}
                        <ThemeToggle />

                        {/* Location Selector Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLocDropdownOpen(!isLocDropdownOpen)}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none dark:text-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                                aria-haspopup="listbox"
                                aria-expanded={isLocDropdownOpen}
                            >
                                <MapPin className="h-3.5 w-3.5 text-[#5B3DF5]" />
                                <span className="max-xs:hidden">{currentLocation}</span>
                                <ChevronDown className="h-3 w-3 text-gray-500" />
                            </button>

                            <AnimatePresence>
                                {isLocDropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsLocDropdownOpen(false)} />
                                        <motion.ul
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 mt-2 w-44 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden z-20 dark:border-zinc-800 dark:bg-zinc-90 w-w-44 select-none dark:bg-zinc-900"
                                            role="listbox"
                                        >
                                            {locations.map((loc) => (
                                                <li key={loc}>
                                                    <button
                                                        onClick={() => {
                                                            onLocationChange(loc);
                                                            setIsLocDropdownOpen(false);
                                                        }}
                                                        className={cn(
                                                            "w-full text-left px-4 py-2.5 text-xs transition-colors",
                                                            currentLocation === loc
                                                                ? "bg-[#5B3DF5]/10 text-[#5B3DF5] font-semibold"
                                                                : "text-gray-700 hover:bg-gray-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                                                        )}
                                                    >
                                                        {loc}
                                                    </button>
                                                </li>
                                            ))}
                                        </motion.ul>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Notifications Menu Trigger */}
                        <div className="relative">
                            <button
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-zinc-330 dark:hover:bg-zinc-900 dark:text-zinc-300"
                                aria-label="View notifications"
                            >
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-500" />
                            </button>

                            <AnimatePresence>
                                {isNotificationOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsNotificationOpen(false)} />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 mt-2 w-80 rounded-xl border border-gray-200 bg-white shadow-lg py-2 z-20 dark:border-zinc-800 dark:bg-zinc-900"
                                        >
                                            <div className="px-4 py-2 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
                                                <span className="text-xs font-bold text-gray-900 dark:text-white">Notifications</span>
                                                <span className="text-[10px] text-gray-400 font-medium">Clear All</span>
                                            </div>
                                            <div className="max-h-60 overflow-y-auto">
                                                {notifications.map((notif) => (
                                                    <div
                                                        key={notif.id}
                                                        className={cn(
                                                            "px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors border-b border-gray-50 dark:border-zinc-802 last:border-0",
                                                            notif.unread && "bg-blue-50/30 dark:bg-zinc-800/10"
                                                        )}
                                                    >
                                                        <p className="text-xs text-gray-700 dark:text-zinc-300">{notif.text}</p>
                                                        <span className="text-[9px] text-gray-400 block mt-1">{notif.time}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Desktop-only Profile Menu Button */}
                        <button className="hidden lg:flex items-center justify-center p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-900" aria-label="Open profile dropdown">
                            <User className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Global Search Bar (Positioned under header row on Desktop and mobile layout) */}
                <div className="pb-4 w-full">
                    <div className="relative flex items-center w-full">
                        <div className="absolute left-4 pl-0.5 pointer-events-none text-gray-400 dark:text-zinc-500">
                            <Search className="h-5 w-5" />
                        </div>

                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Search for hoardings, billboards or printing services..."
                            className="w-full pl-12 pr-12 py-3 rounded-2xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder-gray-400 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5B3DF5]/20 focus:border-[#5B3DF5] dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500 dark:focus:bg-zinc-950"
                        />

                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={cn(
                                "absolute right-3 p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors dark:text-zinc-400 dark:hover:bg-zinc-800",
                                isFilterOpen && "text-[#5B3DF5] bg-[#5B3DF5]/10 dark:bg-[#5B3DF5]/20"
                            )}
                            aria-label="Open search filter panel"
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Collapsible Filter Panel */}
                    <AnimatePresence>
                        {isFilterOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden mt-3"
                            >
                                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 flex flex-wrap gap-4 dark:border-zinc-800 dark:bg-zinc-900/40">
                                    <div className="flex flex-col gap-1.5 min-w-40 flex-1">
                                        <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Solution Category</label>
                                        <select className="bg-white border border-gray-200 rounded-lg p-2 text-xs text-gray-700 outline-none dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-300">
                                            <option>All Services</option>
                                            <option>Advertising Solutions</option>
                                            <option>Printing Solutions</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1.5 min-w-40 flex-1">
                                        <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Pricing Range</label>
                                        <select className="bg-white border border-gray-200 rounded-lg p-2 text-xs text-gray-700 outline-none dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-300">
                                            <option>Any Price</option>
                                            <option>Under ₹5,000</option>
                                            <option>₹5,000 - ₹10,000</option>
                                            <option>Above ₹10,000</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1.5 min-w-40 flex-1">
                                        <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Availablity Duration</label>
                                        <select className="bg-white border border-gray-200 rounded-lg p-2 text-xs text-gray-700 outline-none dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-300">
                                            <option>Immediate booking</option>
                                            <option>Available next 30 days</option>
                                            <option>Available next 60 days</option>
                                        </select>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
