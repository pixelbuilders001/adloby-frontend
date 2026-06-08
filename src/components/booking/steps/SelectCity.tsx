"use client";

import * as React from "react";
import { Search, MapPin, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useBookingStore } from "@/store/useBookingStore";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

const CITIES = [
    "Gorakhpur",
    "Lucknow",
    "Kanpur",
    "Varanasi",
    "Delhi",
    "Noida",
    "Patna"
];

export default function SelectCity() {
    const { selectedCity, updateBooking, nextStep } = useBookingStore();
    const [search, setSearch] = React.useState("");

    const filteredCities = CITIES.filter(city =>
        city.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Select City</h2>
                <p className="text-gray-400 font-medium tracking-wide">Where would you like to run your campaign?</p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
                {/* Search Input */}
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#5B3DF5] transition-colors" />
                    <input
                        type="text"
                        placeholder="Search for a city..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-gray-50/50 border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#5B3DF5]/10 focus:border-[#5B3DF5] transition-all font-bold text-slate-800"
                    />
                </div>

                {/* Cities List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredCities.map((city) => {
                        const isSelected = selectedCity === city;
                        return (
                            <button
                                key={city}
                                onClick={() => updateBooking({ selectedCity: city })}
                                className={cn(
                                    "flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 active:scale-[0.98]",
                                    isSelected
                                        ? "bg-[#5B3DF5]/5 border-[#5B3DF5] shadow-[0_8px_20px_rgba(91,61,245,0.1)]"
                                        : "bg-white border-gray-50 hover:border-gray-100 hover:bg-gray-50/50"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "h-10 w-10 rounded-xl flex items-center justify-center transition-all",
                                        isSelected ? "bg-[#5B3DF5] text-white shadow-lg" : "bg-gray-100 text-gray-400"
                                    )}>
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <span className={cn(
                                        "font-black tracking-tight",
                                        isSelected ? "text-slate-900" : "text-slate-600"
                                    )}>
                                        {city}
                                    </span>
                                </div>

                                <div className={cn(
                                    "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                                    isSelected
                                        ? "bg-[#5B3DF5] border-[#5B3DF5] text-white"
                                        : "border-gray-200"
                                )}>
                                    {isSelected && <Check className="h-3 w-3" />}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Next Button Section - Mobile Fixed / Desktop Normal */}
            <div className="lg:hidden h-24" /> {/* Spacer */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 lg:static lg:bg-transparent lg:border-0 lg:p-0 z-40">
                <div className="max-w-7xl mx-auto flex items-center justify-between lg:justify-end gap-6 font-bold lg:pt-8 bg-white lg:bg-transparent p-4 lg:p-0 rounded-t-[32px] lg:rounded-none shadow-2xl lg:shadow-none">
                    <div className="flex flex-col lg:hidden">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest leading-none mb-1">Estimated Price</span>
                        <span className="text-xl font-black text-[#5B3DF5]">₹0</span>
                    </div>
                    <Button
                        onClick={nextStep}
                        disabled={!selectedCity}
                        className="bg-[#5B3DF5] hover:bg-[#4a2ee0] text-white font-bold rounded-2xl px-12 py-7 h-auto flex-1 lg:flex-none shadow-lg shadow-[#5B3DF5]/20 disabled:grayscale disabled:opacity-50 transition-all"
                    >
                        Next Step
                        <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="ml-2">
                            →
                        </motion.span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
