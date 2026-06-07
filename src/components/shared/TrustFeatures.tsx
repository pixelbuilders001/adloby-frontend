import * as React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { TRUST_FEATURES } from "@/data/adlobyData";

export function TrustFeatures() {
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
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <section className="py-6 sm:py-8 w-full select-none">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
            >
                {TRUST_FEATURES.map((feature) => {
                    const IconComponent = (LucideIcons as unknown as Record<string, React.ElementType>)[feature.iconName] || LucideIcons.HelpCircle;

                    return (
                        <motion.div
                            key={feature.id}
                            variants={itemVariants}
                            whileHover={{ y: -2 }}
                            className="flex items-start gap-3 p-4 rounded-2xl border border-gray-150 bg-white"
                            role="article"
                        >
                            {/* Green Icon Box */}
                            <div className="h-9 w-9 rounded-xl bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center flex-shrink-0">
                                <IconComponent className="h-5 w-5 stroke-[2]" />
                            </div>
                            <div className="space-y-0.5">
                                <h3 className="font-extrabold text-[12px] sm:text-xs text-gray-950 leading-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium leading-none">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
