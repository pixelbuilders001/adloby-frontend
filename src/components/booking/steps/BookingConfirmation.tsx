"use client";

import * as React from "react";
import { CheckCircle2, Download, Home, Package } from "lucide-react";
import { useBookingStore } from "@/store/useBookingStore";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BookingConfirmation() {
    const { calculateTotal, resetBooking } = useBookingStore();
    const total = calculateTotal();
    const bookingId = "ADVY" + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

    return (
        <div className="flex flex-col items-center justify-center py-12 text-center max-w-sm mx-auto space-y-8">
            <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 12, stiffness: 200 }}
                className="h-24 w-24 lg:h-32 lg:w-32 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shadow-2xl shadow-green-500/20"
            >
                <CheckCircle2 className="h-12 w-12 lg:h-16 lg:w-16" />
            </motion.div>

            <div className="space-y-3 px-4 lg:px-0">
                <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Booking Confirmed!</h2>
                <p className="text-xs lg:text-sm text-gray-400 font-medium leading-relaxed">
                    Your campaign has been successfully booked. Our team will review the details and get back to you within 24 hours.
                </p>
            </div>

            <div className="w-full bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center text-xs lg:text-sm py-2 border-b border-gray-50">
                    <span className="text-gray-400 font-medium tracking-tight">Booking ID</span>
                    <span className="font-bold text-slate-800">{bookingId}</span>
                </div>
                <div className="flex justify-between items-center text-xs lg:text-sm py-2 border-b border-gray-50">
                    <span className="text-gray-400 font-medium tracking-tight">Total Amount</span>
                    <span className="font-bold text-slate-800">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs lg:text-sm py-2">
                    <span className="text-gray-400 font-medium tracking-tight">Payment Status</span>
                    <span className="flex items-center gap-1.5 font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full text-[9px] lg:text-[10px] uppercase tracking-widest">
                        <div className="h-1 w-1 lg:h-1.5 lg:w-1.5 rounded-full bg-green-500 animate-pulse" />
                        Paid
                    </span>
                </div>
            </div>

            <div className="flex flex-col w-full px-4 lg:px-0 gap-3">
                <Button className="w-full bg-[#5B3DF5] hover:bg-[#4a2ee0] text-white font-bold rounded-xl lg:rounded-2xl py-4 lg:py-6 h-auto shadow-lg shadow-[#5B3DF5]/20 flex items-center justify-center gap-2 group font-sans">
                    <Download className="h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-y-0.5 transition-transform" />
                    Download Invoice
                </Button>

                <Link href="/dashboard" className="w-full">
                    <Button variant="outline" className="w-full rounded-xl lg:rounded-2xl py-4 lg:py-6 h-auto border-gray-100 text-slate-600 hover:bg-gray-50 flex items-center justify-center gap-2 font-sans font-bold">
                        <Package className="h-4 w-4 lg:h-5 lg:w-5" />
                        Track My Campaign
                    </Button>
                </Link>

                <Link href="/" className="w-full" onClick={resetBooking}>
                    <Button variant="ghost" className="w-full rounded-2xl py-4 h-auto text-gray-400 hover:text-slate-900 flex items-center justify-center gap-2">
                        <Home className="h-4 w-4" />
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
