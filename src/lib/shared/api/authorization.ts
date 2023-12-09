import type { BackendService } from "./backend-service";

interface ApiResponse<T> {
    data: T | null;
    error?: string;
}

export interface User {
    id: number
    username: string
    password: string
    telegram_id: string | null
    vk_id: string | null
    google_id: string | null
}

export class Authorization {
    private service: BackendService
    constructor(service: BackendService) {
        this.service = service
    }

    async login(username: string, password: string): Promise<ApiResponse<User | null>> {
        try {
            const response = await this.service.api.post(
                '/auth/login',
                { username, password }
            );

            return { data: response.data };
        } catch (error) {
            if (error instanceof Error) { console.error('Error during login:', error?.message); }
            return { data: null, error: 'Error during login' };
        }
    }

}