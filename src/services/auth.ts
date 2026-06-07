import api from "@/lib/axios";
import { LoginSchemaType } from "@/validations/auth";
import { User } from "@/store/useAuthStore";

interface LoginResponse {
    user: User;
    token: string;
}

export const authService = {
    async login(data: LoginSchemaType): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>("/auth/login", data);
        return response.data;
    },

    async logout(): Promise<void> {
        // For mock auth API, resolves immediately
        return Promise.resolve();
    },
};
