import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
    onExploreAds: () => void;
    onExplorePrinting: () => void;
}

export function Hero({ onExploreAds, onExplorePrinting }: HeroProps) {
    return (
        <section className="py-6 sm:py-8 w-full select-none">
            <div className="space-y-4">
                {/* Section Label */}
                <h2 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-1.5">
                    <span>Choose What You Need</span>
                </h2>

                {/* Categories Flex Grid */}
                <div className="grid gap-6 md:grid-cols-2">

                    {/* Card 1: Advertising Solutions */}
                    <motion.div
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                        className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#5B3DF5]/5 to-[#5B3DF5]/15 border border-[#5B3DF5]/10 p-6 flex flex-col justify-between min-h-[300px] sm:min-h-[330px]"
                    >
                        {/* Visual background accents */}
                        <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-90 group-hover:scale-105 transition-transform duration-500 max-xs:opacity-40">
                            <Image
                                src="/images/ad-hero.png"
                                alt="Advertising Billboard Mockup"
                                fill
                                className="object-contain object-bottom-right drop-shadow-lg"
                                priority
                            />
                        </div>

                        <div className="max-w-[60%] space-y-3 z-10">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#5B3DF5]">
                                <Sparkles className="h-3 w-3" />
                                Featured Options
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black text-[#5B3DF5] leading-tight">
                                ADVERTISING SOLUTIONS
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 font-medium">
                                Book premium outdoor billboards, led displays or unipoles for your business.
                            </p>
                        </div>

                        <div className="z-10 mt-6 mt-auto">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={onExploreAds}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5B3DF5] text-white text-xs font-bold shadow-lg shadow-[#5B3DF5]/20 hover:bg-[#4a2ee0] transition-colors focus:ring-4 focus:ring-[#5B3DF5]/30 cursor-pointer"
                            >
                                <span>Explore Ads</span>
                                <ArrowRight className="h-4 w-4" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Card 2: Printing Solutions */}
                    <motion.div
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                        className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#16A34A]/5 to-[#16A34A]/15 border border-[#16A34A]/10 p-6 flex flex-col justify-between min-h-[300px] sm:min-h-[330px]"
                    >
                        {/* Visual background accents */}
                        <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-90 group-hover:scale-105 transition-transform duration-500 max-xs:opacity-40">
                            <Image
                                src="/images/print-hero.png"
                                alt="Printing Press Mockup"
                                fill
                                className="object-contain object-bottom-right drop-shadow-lg"
                                priority
                            />
                        </div>

                        <div className="max-w-[60%] space-y-3 z-10">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#16A34A]">
                                <Sparkles className="h-3 w-3" />
                                Premium Prints
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black text-[#16A34A] leading-tight">
                                PRINTING SOLUTIONS
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 font-medium">
                                Get high quality visiting cards, flex banners, pamphlets and menu cards.
                            </p>
                        </div>

                        <div className="z-10 mt-6 mt-auto">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={onExplorePrinting}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#16A34A] text-white text-xs font-bold shadow-lg shadow-[#16A34A]/25 hover:bg-[#128a3e] transition-colors focus:ring-4 focus:ring-[#16A34A]/30 cursor-pointer"
                            >
                                <span>Explore Printing</span>
                                <ArrowRight className="h-4 w-4" />
                            </motion.button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
