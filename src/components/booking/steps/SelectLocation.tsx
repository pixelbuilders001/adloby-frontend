"use client";

import * as React from "react";
import { Search, Check, ArrowLeft } from "lucide-react";
import { useBookingStore } from "@/store/useBookingStore";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

interface LocationItem {
    id: string;
    name: string;
    category: 'Premium' | 'Standard' | 'Basic';
    price: number;
}

const LOCATIONS: LocationItem[] = [
    { id: "golghar", name: "Golghar Chowk", category: "Premium", price: 2800 },
    { id: "station", name: "Railway Station", category: "Premium", price: 2500 },
    { id: "medical", name: "Medical College Road", category: "Standard", price: 2000 },
    { id: "airport", name: "Airport Road", category: "Standard", price: 1800 },
    { id: "padri", name: "Padri Bazaar", category: "Basic", price: 1200 },
];

export default function SelectLocation() {
    const { location: selectedLoc, updateBooking, nextStep, prevStep } = useBookingStore();
    const [search, setSearch] = React.useState("");

    const filteredLocations = LOCATIONS.filter(loc =>
        loc.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Select Location</h2>
                <p className="text-gray-400 font-medium tracking-wide">Pick the perfect spot for maximum visibility.</p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
                {/* Search Input */}
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#5B3DF5] transition-colors" />
                    <input
                        type="text"
                        placeholder="Search for a location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-gray-50/50 border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#5B3DF5]/10 focus:border-[#5B3DF5] transition-all font-bold text-slate-800"
                    />
                </div>

                {/* Locations List */}
                <div className="space-y-3">
                    {filteredLocations.map((loc) => {
                        const isSelected = selectedLoc?.id === loc.id;
                        return (
                            <button
                                key={loc.id}
                                onClick={() => updateBooking({ location: loc })}
                                className={cn(
                                    "w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 group active:scale-[0.99]",
                                    isSelected
                                        ? "bg-[#5B3DF5]/5 border-[#5B3DF5] shadow-[0_8px_20px_rgba(91,61,245,0.08)]"
                                        : "bg-white border-gray-50 hover:border-gray-100 hover:bg-gray-50/50"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                                        isSelected
                                            ? "bg-[#5B3DF5] border-[#5B3DF5] text-white"
                                            : "border-gray-200"
                                    )}>
                                        {isSelected && <Check className="h-3 w-3" />}
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className={cn(
                                                "font-black tracking-tight",
                                                isSelected ? "text-slate-900" : "text-slate-600"
                                            )}>
                                                {loc.name}
                                            </span>
                                            <span className={cn(
                                                "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                                                loc.category === "Premium" ? "bg-amber-100 text-amber-700" :
                                                    loc.category === "Standard" ? "bg-blue-100 text-blue-700" :
                                                        "bg-gray-100 text-gray-700"
                                            )}>
                                                {loc.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Starting From</span>
                                    <span className={cn(
                                        "text-lg font-black",
                                        isSelected ? "text-[#5B3DF5]" : "text-slate-800"
                                    )}>
                                        ₹{loc.price.toLocaleString()}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="lg:hidden h-24" />
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 lg:static lg:bg-transparent lg:border-0 lg:p-0 z-40">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 font-bold lg:pt-8 bg-white lg:bg-transparent p-4 lg:p-0 rounded-t-[32px] lg:rounded-none shadow-2xl lg:shadow-none">
                    <Button
                        variant="outline"
                        onClick={prevStep}
                        className="rounded-2xl px-8 py-7 h-auto border-gray-100 text-slate-600 hover:bg-gray-50 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span className="hidden sm:inline">Back</span>
                    </Button>

                    <div className="flex flex-col lg:hidden flex-1 pl-4">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest leading-none mb-1">Estimated Price</span>
                        <span className="text-xl font-black text-[#5B3DF5]">₹{selectedLoc?.price.toLocaleString() || 0}</span>
                    </div>

                    <Button
                        onClick={nextStep}
                        disabled={!selectedLoc}
                        className="bg-[#5B3DF5] hover:bg-[#4a2ee0] text-white font-bold rounded-2xl px-12 py-7 h-auto flex-1 lg:flex-none shadow-lg shadow-[#5B3DF5]/20 disabled:grayscale disabled:opacity-50 transition-all font-sans"
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
