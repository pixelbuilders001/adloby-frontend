export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
}

export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
}
