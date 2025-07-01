import { ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError, upload, UploadResponse } from '@imagekit/next';
import { useState } from 'react'

const useUpload = (): {handleUpload: (file: File) => Promise<UploadResponse>; progress: number; url: string; fileId: string} => {
  // State to keep track of the current upload progress (percentage)
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [fileId, setFileId] = useState("")


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

  const handleUpload = async (file: File): Promise<UploadResponse> => {
      // Retrieve authentication parameters for the upload.
      let authParams;
      try {
          authParams = await authenticator();
      } catch (authError) {
          console.error("Failed to authenticate for upload:", authError);
          throw authError;
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
          return uploadResponse

      } catch (error) {
          if (error instanceof ImageKitAbortError) {
              console.error("Upload aborted:", error.reason);
              throw error.reason
          } else if (error instanceof ImageKitInvalidRequestError) {
              console.error("Invalid request:", error.message);
              throw error.message
          } else if (error instanceof ImageKitUploadNetworkError) {
              console.error("Network error:", error.message);
              throw error.message
          } else if (error instanceof ImageKitServerError) {
              console.error("Server error:", error.message);
              throw error.message
          } else {
              console.error("Upload error:", error);
              throw error
          }
      }
  };

  return {handleUpload, progress, url, fileId}
}

export default useUpload