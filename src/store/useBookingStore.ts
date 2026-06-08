import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DesignOption = 'own' | 'template' | 'custom' | null;

export interface BookingState {
    activeStep: number;
    selectedCity: string;
    mediaType: string;
    location: {
        id: string;
        name: string;
        category: 'Premium' | 'Standard' | 'Basic';
        price: number;
    } | null;
    size: {
        id: string;
        label: string;
        multiplier: number;
        price: number;
    } | null;
    duration: {
        id: string;
        label: string;
        multiplier: number;
    } | null;
    designOption: DesignOption;
    selectedTemplate: {
        id: string;
        name: string;
        fee: number;
    } | null;
    bookingId: string;

    // Actions
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    updateBooking: (data: Partial<Omit<BookingState, 'setStep' | 'nextStep' | 'prevStep' | 'updateBooking' | 'calculateTotal' | 'resetBooking'>>) => void;
    calculateTotal: () => number;
    resetBooking: () => void;
}

export const useBookingStore = create<BookingState>()(
    persist(
        (set, get) => ({
            activeStep: 1,
            selectedCity: '',
            mediaType: '',
            location: null,
            size: null,
            duration: null,
            designOption: null,
            selectedTemplate: null,
            bookingId: '',

            setStep: (step) => set({ activeStep: step }),

            nextStep: () => set((state) => {
                let targetStep = state.activeStep + 1;
                if (state.activeStep === 6 && state.designOption !== 'template') {
                    targetStep = 8;
                }
                return { activeStep: Math.min(targetStep, 9) };
            }),

            prevStep: () => set((state) => {
                let targetStep = state.activeStep - 1;
                if (state.activeStep === 8 && state.designOption !== 'template') {
                    targetStep = 6;
                }
                return { activeStep: Math.max(targetStep, 1) };
            }),

            updateBooking: (data) => set((state) => ({
                ...state,
                ...data
            })),

            calculateTotal: () => {
                const { location, size, duration, selectedTemplate, designOption } = get();
                if (!location || !size || !duration) return 0;

                const basePrice = location.price * size.multiplier * duration.multiplier;
                const templateFee = (designOption === 'template' && selectedTemplate) ? selectedTemplate.fee : 0;
                const platformFee = 100;
                const gst = (basePrice + templateFee + platformFee) * 0.18;

                return Math.round(basePrice + templateFee + platformFee + gst);
            },

            resetBooking: () => set({
                activeStep: 1,
                selectedCity: '',
                mediaType: '',
                location: null,
                size: null,
                duration: null,
                designOption: null,
                selectedTemplate: null,
                bookingId: '',
            }),
        }),
        {
            name: 'adloby-booking-storage',
        }
    )
);
