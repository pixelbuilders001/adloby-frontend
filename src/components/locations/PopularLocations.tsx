import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, MapPin } from "lucide-react";
import { POPULAR_LOCATIONS } from "@/data/adlobyData";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";

export function PopularLocations() {
    const router = useRouter();
    const [favorites, setFavorites] = React.useState<Record<string, boolean>>({});

    const toggleFavorite = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setFavorites((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 15 },
        show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <section className="py-6 sm:py-8 w-full select-none">
            <div className="space-y-4">
                {/* Title */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                        <span>Popular Ad Locations Near You</span>
                    </h2>
                    <button className="text-xs font-bold text-[#5B3DF5] hover:underline">
                        View All
                    </button>
                </div>

                {/* Mobile: Horizontal scroll layout | Desktop: 4 columns */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-6 pb-4 md:pb-0 snap-x scrollbar-thin scrollbar-thumb-gray-200"
                    role="region"
                    aria-label="Popular locations listing"
                >
                    {POPULAR_LOCATIONS.map((loc) => {
                        const isFav = !!favorites[loc.id];

                        return (
                            <motion.div
                                key={loc.id}
                                variants={itemVariants}
                                whileHover={{ y: -6 }}
                                className="flex-shrink-0 w-[280px] xs:w-[300px] lg:w-auto snap-start bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                            >
                                {/* Visual Image Banner */}
                                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-gray-100">
                                    <Image
                                        src={loc.image}
                                        alt={loc.title}
                                        fill
                                        className="object-cover transform hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Distance Badge */}
                                    <span className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1 z-10">
                                        <MapPin className="h-3 w-3 text-white" />
                                        {loc.distance}
                                    </span>
                                    {/* Favorite Round Button */}
                                    <motion.button
                                        whileTap={{ scale: 0.8 }}
                                        onClick={(e) => toggleFavorite(loc.id, e)}
                                        className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 shadow-md backdrop-blur-sm flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors z-10"
                                        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                                    >
                                        <Heart
                                            className={cn(
                                                "h-4 w-4 transition-colors duration-200",
                                                isFav ? "fill-red-500 text-red-500" : "text-gray-500"
                                            )}
                                        />
                                    </motion.button>
                                </div>

                                {/* Meta details */}
                                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-1">
                                        <h3 className="font-extrabold text-sm sm:text-base text-gray-900 leading-tight">
                                            {loc.title}
                                        </h3>
                                        <p className="text-[11px] font-semibold text-gray-400">
                                            Premium location hoarding
                                        </p>
                                    </div>

                                    <div className="border-t border-gray-100 pt-3 flex justify-between items-end">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider leading-none">Starting from</span>
                                            <span className="text-sm sm:text-base font-black text-[#5B3DF5] mt-1">
                                                {loc.price.split("/")[0]}
                                                <span className="text-xs font-bold text-gray-500">/ {loc.price.split("/")[1]?.trim()}</span>
                                            </span>
                                        </div>

                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => router.push("/book")}
                                            className="px-3.5 py-1.5 rounded-xl bg-[#5B3DF5]/5 hover:bg-[#5B3DF5]/10 text-xs font-bold text-[#5B3DF5] transition-all"
                                        >
                                            Book
                                        </motion.button>
                                    </div>
                                </div>

                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
