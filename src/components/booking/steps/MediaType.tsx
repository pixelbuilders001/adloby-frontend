"use client";

import * as React from "react";
import {
    Monitor,
    Smartphone,
    MonitorPlay,
    Brush,
    Bus,
    Check,
    ArrowLeft,
    Gamepad2
} from "lucide-react";
import { useBookingStore } from "@/store/useBookingStore";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const MEDIA_TYPES = [
    { id: "billboard", label: "Billboard", icon: Monitor, price: 1800 },
    { id: "unipole", label: "Unipole", icon: Smartphone, price: 1500 },
    { id: "led", label: "LED Screen", icon: MonitorPlay, price: 2500 },
    { id: "wall", label: "Wall Wrap", icon: Brush, price: 1200 },
    { id: "hoarding", label: "Hoarding", icon: Gamepad2, price: 2200 },
    { id: "transit", label: "Transit Media", icon: Bus, price: 1400 },
];

export default function MediaType() {
    const { mediaType, updateBooking, nextStep, prevStep } = useBookingStore();

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight">Select Media Type</h2>
                <p className="text-gray-400 font-medium tracking-wide">Choose the advertising format that fits your needs.</p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {MEDIA_TYPES.map((type) => {
                        const isSelected = mediaType === type.id;
                        const Icon = type.icon;

                        return (
                            <button
                                key={type.id}
                                onClick={() => updateBooking({ mediaType: type.id })}
                                className={cn(
                                    "relative flex flex-col items-center justify-center gap-3 lg:gap-4 p-4 lg:p-8 rounded-3xl border lg:border-2 transition-all duration-300 group active:scale-[0.98]",
                                    isSelected
                                        ? "bg-[#5B3DF5]/5 border-[#5B3DF5] shadow-[0_12px_24px_rgba(91,61,245,0.1)]"
                                        : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"
                                )}
                            >
                                <div className={cn(
                                    "h-10 w-10 lg:h-14 lg:w-14 rounded-2xl flex items-center justify-center transition-all duration-300",
                                    isSelected ? "bg-[#5B3DF5] text-white shadow-lg" : "bg-gray-50 text-slate-400 group-hover:bg-white"
                                )}>
                                    <Icon className="h-5 w-5 lg:h-7 lg:w-7" />
                                </div>

                                <span className={cn(
                                    "text-sm lg:text-base font-bold tracking-tight text-center leading-tight",
                                    isSelected ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
                                )}>
                                    {type.label}
                                </span>

                                {isSelected && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute top-4 right-4 h-6 w-6 rounded-full bg-[#5B3DF5] text-white flex items-center justify-center shadow-md shadow-[#5B3DF5]/20"
                                    >
                                        <Check className="h-3.5 w-3.5" />
                                    </motion.div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="lg:hidden h-24" /> {/* Spacer */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 lg:static lg:bg-transparent lg:border-0 lg:p-0 z-40">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 font-bold lg:pt-8 bg-white lg:bg-transparent p-4 lg:p-0 rounded-t-[32px] lg:rounded-none shadow-2xl lg:shadow-none">
                    <Button
                        variant="outline"
                        onClick={prevStep}
                        className="rounded-xl px-6 lg:px-8 py-5 lg:py-7 h-auto border-gray-100 text-slate-600 hover:bg-gray-50 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span className="hidden sm:inline">Back</span>
                    </Button>

                    <div className="flex flex-col lg:hidden flex-1 pl-2">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold leading-none mb-1">Starting From</span>
                        <span className="text-lg font-bold text-[#5B3DF5]">₹1,800</span>
                    </div>

                    <Button
                        onClick={nextStep}
                        disabled={!mediaType}
                        className="bg-[#5B3DF5] hover:bg-[#4a2ee0] text-white font-bold rounded-xl lg:rounded-2xl px-8 lg:px-12 py-5 lg:py-7 h-auto flex-1 lg:flex-none shadow-lg shadow-[#5B3DF5]/20 disabled:grayscale disabled:opacity-50 transition-all font-sans"
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
