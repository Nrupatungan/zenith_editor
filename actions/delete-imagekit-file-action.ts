"use server"

export async function deleteImageKitFile(fileId: string) {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("IMAGEKIT_PRIVATE_KEY is not set in environment variables.");
  }

  const encodedString = Buffer.from(privateKey + ':').toString('base64');
  const url = `https://api.imagekit.io/v1/files/${fileId}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Basic ${encodedString}`,
    },
  });

  if (!response.ok) {
    let errorMsg = await response.text();
    try {
      const errorJson = JSON.parse(errorMsg);
      errorMsg = errorJson.message || errorMsg;
    } catch {}
    throw new Error(`ImageKit delete failed: ${errorMsg}`);
  }

  return true;
}