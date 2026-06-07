import { create } from "zustand";

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
    setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => {
    const getInitialState = () => {
        if (typeof window === "undefined") {
            return { user: null, token: null, isAuthenticated: false };
        }
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");
        let user = null;
        if (userStr) {
            try {
                user = JSON.parse(userStr);
            } catch {
                // Safe fail
            }
        }
        return {
            token,
            user,
            isAuthenticated: !!token,
        };
    };

    const initialState = getInitialState();

    return {
        ...initialState,
        isLoading: false,
        login: (user, token) => {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            if (typeof window !== "undefined") {
                document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax; Secure=${window.location.protocol === "https:"}`;
            }
            set({ user, token, isAuthenticated: true });
        },
        logout: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            if (typeof window !== "undefined") {
                document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
            set({ user: null, token: null, isAuthenticated: false });
        },
        setLoading: (isLoading) => set({ isLoading }),
    };
});
