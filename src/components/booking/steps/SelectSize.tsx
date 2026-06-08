"use client";

import * as React from "react";
import { Check, ArrowLeft, Layout } from "lucide-react";
import { useBookingStore } from "@/store/useBookingStore";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

interface SizeItem {
    id: string;
    label: string;
    sqft: number;
    multiplier: number;
    price: number;
}

const SIZES: SizeItem[] = [
    { id: "5x4", label: "5 x 4 ft", sqft: 20, multiplier: 1, price: 2800 },
    { id: "10x10", label: "10 x 10 ft", sqft: 100, multiplier: 2.5, price: 7000 },
    { id: "20x10", label: "20 x 10 ft", sqft: 200, multiplier: 5, price: 14000 },
    { id: "30x20", label: "30 x 20 ft", sqft: 600, multiplier: 10, price: 28000 },
];

export default function SelectSize() {
    const { size: selectedSize, updateBooking, nextStep, prevStep } = useBookingStore();

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight">Select Size</h2>
                <p className="text-gray-400 font-medium tracking-wide">Choose the dimensions for your advertisement.</p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {SIZES.map((size) => {
                        const isSelected = selectedSize?.id === size.id;

                        return (
                            <button
                                key={size.id}
                                onClick={() => updateBooking({ size: size })}
                                className={cn(
                                    "relative flex flex-col p-4 lg:p-6 rounded-3xl border lg:border-2 transition-all duration-300 group active:scale-[0.98]",
                                    isSelected
                                        ? "bg-[#5B3DF5]/5 border-[#5B3DF5] shadow-[0_12px_24px_rgba(91,61,245,0.1)]"
                                        : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"
                                )}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={cn(
                                        "h-10 w-10 lg:h-12 lg:w-12 rounded-2xl flex items-center justify-center transition-all duration-300 outline outline-4 outline-offset-2",
                                        isSelected ? "bg-[#5B3DF5] text-white outline-[#5B3DF5]/20 shadow-lg" : "bg-gray-50 text-slate-400 group-hover:bg-white outline-transparent"
                                    )}>
                                        <Layout className="h-5 w-5 lg:h-6 lg:w-6" />
                                    </div>
                                    <div className={cn(
                                        "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                                        isSelected ? "bg-[#5B3DF5] border-[#5B3DF5] text-white" : "border-gray-200"
                                    )}>
                                        {isSelected && <Check className="h-3 w-3" />}
                                    </div>
                                </div>

                                <div className="flex flex-col items-start gap-1">
                                    <span className={cn(
                                        "text-lg lg:text-xl font-bold lg:font-black tracking-tight",
                                        isSelected ? "text-slate-900" : "text-slate-600"
                                    )}>
                                        {size.label}
                                    </span>
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none mb-4">
                                        {size.sqft} Sq. Ft.
                                    </span>

                                    <div className="flex flex-col items-start">
                                        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest leading-none mb-1">Price</span>
                                        <span className={cn(
                                            "text-lg lg:text-xl font-bold lg:font-black",
                                            isSelected ? "text-[#5B3DF5]" : "text-slate-800"
                                        )}>
                                            ₹{size.price.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="lg:hidden h-24" />
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
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold leading-none mb-1">Estimated Price</span>
                        <span className="text-lg font-bold text-[#5B3DF5]">₹{selectedSize?.price.toLocaleString() || 0}</span>
                    </div>

                    <Button
                        onClick={nextStep}
                        disabled={!selectedSize}
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
