import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { importEnvWithError } from "../utils/importEnvWithError";

interface ICreator {
  isV2: boolean;
  hasApiKey: boolean;
}

function createAxiosInstance({
  isV2 = true,
  hasApiKey = true,
}: Partial<ICreator>): AxiosInstance {
  const baseURL = importEnvWithError("VITE_BASE_URL");

  const apiKey = importEnvWithError("VITE_API_KEY");

  const versionedUrl = baseURL.replace("%", isV2 ? "2" : "1");

  const options: AxiosRequestConfig = {
    baseURL: versionedUrl,
  };

  if (hasApiKey) {
    options.params["api_key"] = apiKey;
  }

  const instance = axios.create(options);

  return instance;
}

export const axiosV2Key = createAxiosInstance({});
export const axiosV1Key = createAxiosInstance({ isV2: false });
