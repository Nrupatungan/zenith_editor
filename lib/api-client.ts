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

    async getObjects() {
        return this.fetch('/objects');
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

    async deleteObjectInDAM(fileId: string){
        const privateKey = process.env.IMAGEKIT_PRIVATE_KEY!;

        const encodedString = Buffer.from(privateKey + ':').toString('base64');
        
        const response = await fetch(`https://api.imagekit.io/v1/files/${fileId}`, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${encodedString}`
            }
        })

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return response.json();
    }
}

export const apiClient = new ApiClient();