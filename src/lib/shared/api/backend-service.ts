import axios, { type AxiosInstance } from 'axios';
import { Authorization } from './authorization';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

export interface ApiResponse<T> {
    data: T;
}

export class BackendService {
    public readonly api: AxiosInstance;
    public readonly authorization: Authorization = new Authorization(this)

    constructor(baseUrl: string) {
        this.api = axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
    }
}

export const backendService = new BackendService(PUBLIC_BACKEND_URL)