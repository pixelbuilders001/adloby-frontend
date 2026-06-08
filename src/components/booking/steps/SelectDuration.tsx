"use client";

import * as React from "react";
import { Check, ArrowLeft, Zap } from "lucide-react";
import { useBookingStore } from "@/store/useBookingStore";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const DURATIONS = [
    { id: "7", label: "7 Days", multiplier: 0.3 },
    { id: "15", label: "15 Days", multiplier: 0.6 },
    { id: "30", label: "30 Days", multiplier: 1 },
    { id: "60", label: "60 Days", multiplier: 1.8 },
    { id: "90", label: "90 Days", multiplier: 2.5 },
];

export default function SelectDuration() {
    const { duration: selectedDur, location, size, updateBooking, nextStep, prevStep } = useBookingStore();

    const basePrice = (location?.price || 0) * (size?.multiplier || 1);

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Select Duration</h2>
                <p className="text-gray-400 font-medium tracking-wide">For how long should your advertisement stay live?</p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                <div className="space-y-3">
                    {DURATIONS.map((dur) => {
                        const isSelected = selectedDur?.id === dur.id;
                        const finalPrice = Math.round(basePrice * dur.multiplier);

                        return (
                            <button
                                key={dur.id}
                                onClick={() => updateBooking({ duration: dur })}
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
                                    <div className="flex flex-col items-start gap-0.5">
                                        <span className={cn(
                                            "text-lg font-black tracking-tight",
                                            isSelected ? "text-slate-900" : "text-slate-600"
                                        )}>
                                            {dur.label}
                                        </span>
                                        <div className="flex items-center gap-1.5">
                                            <Zap className={cn("h-3 w-3", isSelected ? "text-[#5B3DF5]" : "text-gray-300")} />
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                                                {dur.multiplier}x Multiplier
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Final Amount</span>
                                    <span className={cn(
                                        "text-lg font-black",
                                        isSelected ? "text-[#5B3DF5]" : "text-slate-800"
                                    )}>
                                        ₹{finalPrice.toLocaleString()}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-8 p-4 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed italic text-center">
                        * Price includes location premium and size multipliers. Platform fees and GST will be added at the final step.
                    </p>
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
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest leading-none mb-1">Estimated Total</span>
                        <span className="text-xl font-black text-[#5B3DF5]">
                            ₹{Math.round(basePrice * (selectedDur?.multiplier || 0)).toLocaleString()}
                        </span>
                    </div>

                    <Button
                        onClick={nextStep}
                        disabled={!selectedDur}
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
