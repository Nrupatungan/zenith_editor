import { ValidateProps } from "@/app/api/validate-order/route";
import { Object } from "@/app/generated/prisma";
import { ProfileType } from "@/validators/profile.validator";

type FetchOptions = {
    method?: "POST" | "GET" | "PUT" | "DELETE";
    body?: any;
    headers?: Record<string, string>;
}

export type ObjectFormData = Omit<Object, "createdAt" | "updatedAt" | "id">;

export function getBaseUrl() {
    if (typeof window !== "undefined") {
        // Running on the client
        return "";
    }
    // Running on the server
    return process.env.NEXT_PUBLIC_BASE_URL;
}

class ApiClient {
    private async fetch<T>(
        endpoint: string,
        options: FetchOptions = {}
    ): Promise<T> {
        const { method = "GET", body, headers = {} } = options;

        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers
        };

        const baseUrl = getBaseUrl()
        const url = `${baseUrl}/api${endpoint}`;

        const response = await fetch(url, {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers: defaultHeaders
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return response.json();
    }

    async getObjects(id: string) {
        return this.fetch(`/objects?id=${id}&take=6&skip=6`);
    }

    async createObject(objectData: ObjectFormData) {
        return this.fetch('/objects', {
            method: "POST",
            body: objectData
        });
    }

    async deleteObject(id: string){
        return this.fetch('/objects', {
            method: "DELETE",
            body: {id}
        })
    }

    async createOrder(amount: number){
        return this.fetch('/create-order', {
            method: "POST",
            body: {amount}
        })
    }
    
    async validateOrder({razorpay_payment_id, razorpay_order_id, razorpay_signature}: ValidateProps){
        return this.fetch('/validate-order', {
            method: "POST",
            body: {razorpay_order_id, razorpay_payment_id, razorpay_signature}
        })
    }

    async updateProfile(data: FormData){
        return this.fetch('/update-profile', {
            method: "POST",
            body: data
        })
    }
}

export const apiClient = new ApiClient();