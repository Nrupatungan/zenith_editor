import { Object } from "@/app/generated/prisma";

type FetchOptions = {
    method?: "POST" | "GET" | "PUT" | "DELETE";
    body?: any;
    headers?: Record<string, string>;
}

export type ObjectFormData = Omit<Object, "createdAt" | "updatedAt" | "id">;

function getBaseUrl() {
    if (typeof window !== "undefined") {
        // Running on the client
        return "";
    }
    // Running on the server
    return "http://localhost:3000";
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
        return this.fetch(`/objects?id=${id}`);
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
    
}

export const apiClient = new ApiClient();