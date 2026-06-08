"use client";

import * as React from "react";
import { ArrowLeft, Edit2, Info, ArrowRight } from "lucide-react";
import { useBookingStore } from "@/store/useBookingStore";
import { Button } from "@/components/ui/Button";

export default function ReviewBooking() {
    const {
        selectedCity,
        mediaType,
        location,
        size,
        duration,
        designOption,
        selectedTemplate,
        calculateTotal,
        setStep,
        nextStep,
        prevStep
    } = useBookingStore();

    const total = calculateTotal();
    const mediaCost = (location?.price || 0) * (size?.multiplier || 1) * (duration?.multiplier || 1);
    const designCost = (designOption === 'template' && selectedTemplate) ? selectedTemplate.fee : (designOption === 'custom' ? 1500 : 0);
    const platformFee = 100;
    const gst = Math.round((mediaCost + designCost + platformFee) * 0.18);

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Review Your Booking</h2>
                <p className="text-gray-400 font-medium tracking-wide">Double check everything before we proceed to payment.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Summary Cards */}
                <div className="space-y-4">
                    <ReviewCard label="City" value={selectedCity} onEdit={() => setStep(1)} />
                    <ReviewCard label="Media Type" value={mediaType} onEdit={() => setStep(2)} />
                    <ReviewCard label="Location" value={location?.name} onEdit={() => setStep(3)} />
                    <ReviewCard label="Size" value={size?.label} onEdit={() => setStep(4)} />
                    <ReviewCard label="Duration" value={duration?.label} onEdit={() => setStep(5)} />
                    <ReviewCard label="Design Option" value={designOption === 'own' ? 'Upload Own' : designOption === 'template' ? 'Template' : 'Custom'} onEdit={() => setStep(6)} />
                </div>

                {/* Final Breakdown */}
                <div className="bg-[#5B3DF5] rounded-[32px] p-8 text-white shadow-2xl shadow-[#5B3DF5]/30 flex flex-col justify-between">
                    <div className="space-y-6">
                        <h3 className="text-xl font-black tracking-tight">Pricing Breakdown</h3>

                        <div className="space-y-3">
                            <BreakdownRow label="Media Cost" value={mediaCost} />
                            <BreakdownRow label="Design/Template Fee" value={designCost} />
                            <BreakdownRow label="Platform Fee" value={platformFee} />
                            <BreakdownRow label="GST (18%)" value={gst} />
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/10 mt-8">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-bold text-white/60 uppercase tracking-widest">Final Amount</span>
                            <span className="text-4xl font-black tracking-tighter">₹{total.toLocaleString()}</span>
                        </div>

                        <div className="p-4 bg-white/10 rounded-2xl flex items-start gap-3">
                            <Info className="h-5 w-5 text-white/40 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-white/60 font-medium leading-relaxed italic">
                                By clicking proceed, you agree to our terms and conditions. The campaign will be reviewed by our team before going live.
                            </p>
                        </div>
                    </div>
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

                    <Button
                        onClick={nextStep}
                        className="bg-[#5B3DF5] hover:bg-[#4a2ee0] text-white font-bold rounded-2xl px-12 py-7 h-auto flex-1 lg:flex-none shadow-lg shadow-[#5B3DF5]/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                        Proceed To Book
                        <ArrowRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

function ReviewCard({ label, value, onEdit }: { label: string; value?: string; onEdit: () => void }) {
    if (!value) return null;
    return (
        <div className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 group">
            <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">{label}</span>
                <span className="text-base font-black text-slate-800">{value}</span>
            </div>
            <button
                onClick={onEdit}
                className="p-2.5 rounded-xl bg-gray-50 border border-transparent text-gray-400 hover:text-[#5B3DF5] hover:border-[#5B3DF5]/20 hover:bg-[#5B3DF5]/5 transition-all"
            >
                <Edit2 className="h-4 w-4" />
            </button>
        </div>
    );
}

function BreakdownRow({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex justify-between items-center text-sm">
            <span className="text-white/60 font-medium">{label}</span>
            <span className="font-bold">₹{value.toLocaleString()}</span>
        </div>
    );
}
