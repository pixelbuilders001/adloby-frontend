import * as React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { TIMELINE_STEPS } from "@/data/adlobyData";
import { ArrowRight, ArrowDown } from "lucide-react";

export function Timeline() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    };

    return (
        <section className="py-8 sm:py-12 w-full select-none bg-gray-50/50 rounded-3xl p-6 sm:p-8 dark:bg-zinc-900/20 border border-gray-100 dark:border-zinc-900">
            <div className="space-y-8">
                {/* Title */}
                <div className="text-center space-y-2">
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                        How Adloby Works
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 font-medium max-w-md mx-auto">
                        Book outdoor boards or printing campaigns in 4 easy moves
                    </p>
                </div>

                {/* Desktop: Horizontal layout | Mobile: Vertical layout */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col lg:flex-row items-center lg:justify-between gap-6 lg:gap-4 relative w-full"
                >
                    {TIMELINE_STEPS.map((stepData, index) => {
                        const IconComponent = (LucideIcons as unknown as Record<string, React.ElementType>)[stepData.iconName] || LucideIcons.HelpCircle;

                        return (
                            <React.Fragment key={stepData.step}>
                                {/* Step Item */}
                                <motion.div
                                    variants={itemVariants}
                                    className="flex flex-col items-center text-center max-w-[210px] w-full group relative"
                                >
                                    {/* Icon Card & Circular Number Badge */}
                                    <div className="relative mb-4">
                                        <div className="h-16 w-16 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-[#5B3DF5] shadow-sm group-hover:border-[#5B3DF5]/30 group-hover:shadow-md transition-all dark:bg-zinc-900 dark:border-zinc-800">
                                            <IconComponent className="h-6 w-6 stroke-[1.8]" />
                                        </div>
                                        {/* Circle Number */}
                                        <span className="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-[#5B3DF5] text-white text-xs font-black flex items-center justify-center border-2 border-white dark:border-zinc-950">
                                            {stepData.step}
                                        </span>
                                    </div>

                                    <h3 className="font-extrabold text-sm text-gray-900 dark:text-white mb-1.5 leading-tight group-hover:text-[#5B3DF5] transition-colors">
                                        {stepData.title}
                                    </h3>
                                    <p className="text-[11px] font-medium text-gray-500 dark:text-zinc-400 leading-normal">
                                        {stepData.description}
                                    </p>
                                </motion.div>

                                {/* Connection Arrow */}
                                {index < TIMELINE_STEPS.length - 1 && (
                                    <div className="flex items-center justify-center text-gray-300 dark:text-zinc-800">
                                        {/* Desktop Arrow */}
                                        <ArrowRight className="hidden lg:block h-6 w-6 animate-pulse" />
                                        {/* Mobile Arrow */}
                                        <ArrowDown className="lg:hidden h-5 w-5 my-2 animate-bounce" />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
