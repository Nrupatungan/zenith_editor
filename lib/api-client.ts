import { Video } from "@/app/generated/prisma";

type FetchOptions = {
    method?: "POST" | "GET" | "PUT" | "DELETE";
    body?: any;
    headers?: Record<string, string>;
}

export type VideoFormData = Omit<Video, "createdAt" | "updatedAt">;

class ApiClient{
    private async fetch<T>(
        endpoint: string,
        options: FetchOptions = {}
    ): Promise<T>{
        const {method = "GET", body, headers = {} } = options;

        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers
        }

        const response = await fetch(`/api${endpoint}`, {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers: defaultHeaders
        })

        if(!response.ok){
            throw new Error( await response.text())
        }

        return response.json()
    } 

    async getVideos(){
        return this.fetch('/video')
    }

    async createVideo(videoData: VideoFormData){
        return this.fetch('/video', {
            method: "POST",
            body: videoData
        })
    }
}

export const apiClient = new ApiClient();