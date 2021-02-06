import { post } from "axios";
import imageCompression from "browser-image-compression";

export async function imageUpload(file, destiny) {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 200,
    useWebWorker: true,
  };
  const compressedFile = await imageCompression(file, options);
  console.log(compressedFile);
  const url = "/api/upload-url";
  const formData = new FormData();
  formData.append("file", compressedFile, compressedFile.name);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      destiny,
    },
  };
  return post(url, formData, config);
}
