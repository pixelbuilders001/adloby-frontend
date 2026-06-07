import * as React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ADVERTISING_CATEGORIES } from "@/data/adlobyData";
import { Map } from "lucide-react";

interface AdvertisingGridProps {
    onSelectCategory: (id: string) => void;
}

export function AdvertisingGrid({ onSelectCategory }: AdvertisingGridProps) {
    // Anim container
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <section className="py-6 sm:py-8 w-full select-none">
            <div className="space-y-4">
                {/* Title row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <h2 className="text-xl font-bold tracking-tight text-[#5B3DF5] dark:text-white">
                            Advertising Solutions
                        </h2>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#5B3DF5]/10 px-2 py-0.5 text-[10px] font-bold text-[#5B3DF5] border border-[#5B3DF5]/20 dark:bg-[#5B3DF5]/20">
                            <Map className="h-3 w-3" />
                            Near You
                        </span>
                    </div>
                    <button className="text-xs font-bold text-[#5B3DF5] hover:underline dark:text-purple-400">
                        View All
                    </button>
                </div>

                {/* Grid Container */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                >
                    {ADVERTISING_CATEGORIES.map((category) => {
                        // Dynamically resolve lucide icon
                        const IconComponent = (LucideIcons as unknown as Record<string, React.ElementType>)[category.iconName] || LucideIcons.HelpCircle;

                        return (
                            <motion.button
                                key={category.id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => onSelectCategory(category.id)}
                                className="flex flex-col items-center justify-center p-5 rounded-2xl border border-gray-200 bg-white hover:border-[#5B3DF5]/35 hover:shadow-lg hover:shadow-[#5B3DF5]/5 transition-all text-center focus:outline-none focus:ring-2 focus:ring-[#5B3DF5]/20 group dark:bg-zinc-900/50 dark:border-zinc-800 dark:hover:border-[#5B3DF5]/40"
                            >
                                <div className="h-12 w-12 rounded-xl bg-gray-50 flex items-center justify-center text-[#5B3DF5]/85 group-hover:bg-[#5B3DF5]/10 group-hover:text-[#5B3DF5] transition-colors mb-3 dark:bg-zinc-850 dark:group-hover:bg-[#5B3DF5]/20">
                                    <IconComponent className="h-6 w-6 stroke-[1.8]" />
                                </div>
                                <span className="text-xs font-bold text-gray-800 dark:text-zinc-200 break-words w-full group-hover:text-[#5B3DF5] transition-colors leading-tight">
                                    {category.title}
                                </span>
                            </motion.button>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
