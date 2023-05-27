import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { importEnvWithError } from "../../utils/importEnvWithError/importEnvWithError";
import { useToast } from "vue-toastification";

interface ICreator {
  isV2: boolean;
  hasApiKey: boolean;
  disabledErrors: string[];
}

export function createAxiosInstance({
  isV2 = true,
  hasApiKey = true,
  disabledErrors = [],
}: Partial<ICreator>): AxiosInstance {
  const baseURL = importEnvWithError("VITE_BASE_URL");

  const apiKey = importEnvWithError("VITE_API_KEY");

  const versionedUrl = baseURL.replace("%", isV2 ? "2" : "1");

  const options: AxiosRequestConfig = {
    baseURL: versionedUrl,
    params: {},
  };

  if (hasApiKey) {
    options.params["api_key"] = apiKey;
  }

  const instance = axios.create(options);

  instance.interceptors.response.use(
    (resp) => {
      return resp;
    },
    (err) => {
      const errorMsg = err.response.data?.error;

  
      if (!disabledErrors.includes(errorMsg)) {
        const toast = useToast();
        toast.error(errorMsg);
      }

      return Promise.reject(err);
    }
  );

  return instance;
}

export const axiosV2Key = createAxiosInstance({});
export const axiosV1Key = createAxiosInstance({
  isV2: false,
});
