import * as React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { PRINTING_SOLUTIONS } from "@/data/adlobyData";
import { Printer } from "lucide-react";

interface PrintingGridProps {
    onSelectItem: (id: string) => void;
}

export function PrintingGrid({ onSelectItem }: PrintingGridProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04
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
                {/* Title Group */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold tracking-tight text-[#16A34A] flex items-center gap-2">
                            <span>Printing Solutions</span>
                        </h2>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#16A34A]/10 px-2 py-0.5 text-[10px] font-bold text-[#16A34A] border border-[#16A34A]/20">
                            <Printer className="h-3 w-3" />
                            Verified
                        </span>
                    </div>
                    <button className="text-xs font-bold text-[#16A34A] hover:underline">
                        View All
                    </button>
                </div>

                {/* 5-column / 4-column / 2-column Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4"
                >
                    {PRINTING_SOLUTIONS.map((item) => {
                        const IconComponent = (LucideIcons as unknown as Record<string, React.ElementType>)[item.iconName] || LucideIcons.HelpCircle;

                        return (
                            <motion.button
                                key={item.id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onSelectItem(item.id)}
                                className="flex items-center gap-3.5 p-4 rounded-2xl border border-gray-150 bg-white hover:border-[#16A34A]/30 hover:shadow-lg hover:shadow-[#16A34A]/5 transition-all text-left focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 group"
                            >
                                <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#16A34A] group-hover:bg-[#16A34A]/15 group-hover:text-[#16A34A] transition-colors flex-shrink-0">
                                    <IconComponent className="h-5 w-5 stroke-[1.8]" />
                                </div>
                                <span className="text-xs font-bold text-gray-800 group-hover:text-[#16A34A] transition-colors truncate">
                                    {item.title}
                                </span>
                            </motion.button>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
