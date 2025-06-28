"use client" // This component must be a client component

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import useStore from "@/store";


const FileUpload = () => {
    // State to keep track of the current upload progress (percentage)
    const [progress, setProgress] = useState(0);
    const {setUrl} = useStore()

    // Create a ref for the file input element to access its files easily
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Create an AbortController instance to provide an option to cancel the upload if needed.
    const abortController = new AbortController();

    const authenticator = async () => {
        try {
            // Perform the request to the upload authentication endpoint.
            const response = await fetch("/api/upload-auth");
            if (!response.ok) {
                // If the server response is not successful, extract the error text for debugging.
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            // Parse and destructure the response JSON for upload credentials.
            const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            // Log the original error for debugging before rethrowing a new error.
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };

    const handleUpload = async () => {
        // Access the file input element using the ref
        const fileInput = fileInputRef.current;
        if (!fileInput) return;

        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            fileInput.value = ""; // Clear any previous value
            fileInput.click();
            return;
        }

        // Extract the first file from the file input
        const file = fileInput.files[0];

        // Retrieve authentication parameters for the upload.
        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
        }
        const { signature, expire, token, publicKey } = authParams;

        try {
            const uploadResponse = await upload({
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name, 
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
                
                abortSignal: abortController.signal,
            });
            console.log("Upload response:", uploadResponse);
            setUrl(uploadResponse.url!)

        } catch (error) {
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                console.error("Upload error:", error);
            }
        }finally{
            fileInput.value = ""
        }
    };

    // When a file is selected, immediately trigger upload
    const handleFileChange = async () => {
        await handleUpload();
    };

    return (
        <>
            <div className="grid w-full max-w-sm items-center gap-3" style={{display: 'none'}}>
                <Label htmlFor="picture">File</Label>
                <Input id="picture" type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
            </div>
            
            <Button type="button" onClick={handleUpload}>
                Upload file
            </Button>
            
            {( progress > 0 && progress < 100) && <progress value={progress} max={100} className="h-1 rounded-md"></progress>}
        </>
    );
};

export default FileUpload;
