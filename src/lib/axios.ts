import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // If token exists in client-side storage, add it
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Global error handler
        const message = error.response?.data?.message || "An unexpected error occurred";

        if (error.response?.status === 401 && typeof window !== "undefined") {
            localStorage.removeItem("token");
            // Check if we are already on login page to prevent looping
            if (!window.location.pathname.startsWith("/login")) {
                window.location.href = "/login";
            }
        }

        return Promise.reject({
            ...error,
            message,
        });
    }
);

export default api;
