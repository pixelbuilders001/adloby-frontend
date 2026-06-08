"use client";

import * as React from "react";
import { Search, Check, ArrowLeft, Filter, Grid, Boxes, Hospital, GraduationCap, Building, Utensils, ShoppingBag, Car } from "lucide-react";
import { useBookingStore } from "@/store/useBookingStore";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const CATEGORIES = [
    { id: "all", label: "All", icon: Grid },
    { id: "hospital", label: "Hospital", icon: Hospital },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "realestate", label: "Real Estate", icon: Building },
    { id: "restaurant", label: "Restaurant", icon: Utensils },
    { id: "retail", label: "Retail", icon: ShoppingBag },
    { id: "automobile", label: "Automobile", icon: Car },
];

const TEMPLATES = [
    { id: "t1", name: "Modern Healthcare", category: "Hospital", fee: 500, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80" },
    { id: "t2", name: "Premium Apartments", category: "Real Estate", fee: 750, image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80" },
    { id: "t3", name: "Gourmet Dining", category: "Restaurant", fee: 400, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80" },
    { id: "t4", name: "Elite Academy", category: "Education", fee: 600, image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80" },
];

export default function ChooseTemplate() {
    const { selectedTemplate, updateBooking, nextStep, prevStep } = useBookingStore();
    const [selectedCat, setSelectedCat] = React.useState("all");

    const filteredTemplates = TEMPLATES.filter(t =>
        selectedCat === "all" || t.category.toLowerCase() === selectedCat.toLowerCase()
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Choose Template</h2>
                <p className="text-gray-400 font-medium tracking-wide">Select a pre-designed layout for your campaign.</p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-8">
                {/* Categories */}
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
                    {CATEGORIES.map((cat) => {
                        const isSelected = selectedCat === cat.id;
                        const Icon = cat.icon;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCat(cat.id)}
                                className={cn(
                                    "flex items-center gap-2 px-6 py-3 rounded-2xl border-2 transition-all whitespace-nowrap",
                                    isSelected
                                        ? "bg-[#5B3DF5] border-[#5B3DF5] text-white shadow-lg shadow-[#5B3DF5]/20"
                                        : "bg-white border-gray-50 text-slate-600 hover:border-gray-100"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                <span className="text-xs font-black uppercase tracking-wider">{cat.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredTemplates.map((template) => {
                        const isSelected = selectedTemplate?.id === template.id;
                        return (
                            <button
                                key={template.id}
                                onClick={() => updateBooking({ selectedTemplate: template })}
                                className={cn(
                                    "relative flex flex-col rounded-3xl border-2 overflow-hidden transition-all duration-300 group active:scale-[0.98]",
                                    isSelected
                                        ? "bg-[#5B3DF5]/5 border-[#5B3DF5] shadow-[0_12px_24px_rgba(91,61,245,0.12)]"
                                        : "bg-white border-gray-100 hover:border-gray-200"
                                )}
                            >
                                <div className="h-48 w-full relative overflow-hidden">
                                    <img
                                        src={template.image}
                                        alt={template.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 h-8 px-3 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest flex items-center">
                                        ₹{template.fee} Fee
                                    </div>
                                    {isSelected && (
                                        <div className="absolute inset-0 bg-[#5B3DF5]/40 backdrop-blur-[2px] flex items-center justify-center">
                                            <div className="h-12 w-12 rounded-full bg-white text-[#5B3DF5] flex items-center justify-center shadow-xl">
                                                <Check className="h-6 w-6" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 flex flex-col items-start text-left">
                                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">
                                        {template.category}
                                    </span>
                                    <span className={cn(
                                        "text-base font-black tracking-tight",
                                        isSelected ? "text-[#5B3DF5]" : "text-slate-800"
                                    )}>
                                        {template.name}
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
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest leading-none mb-1">Template Fee</span>
                        <span className="text-xl font-black text-[#5B3DF5]">₹{selectedTemplate?.fee || 0}</span>
                    </div>

                    <Button
                        onClick={nextStep}
                        disabled={!selectedTemplate}
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
