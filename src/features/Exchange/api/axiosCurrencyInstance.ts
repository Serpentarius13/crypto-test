import { createAxiosInstance } from "@/shared/api/axiosInstance/axiosInstance";

export const INACTIVE_ERROR_MESSAGE = "pair_is_inactive";
export const DEPOSIT_TOO_SMALL = "deposit_too_small";

export const instance = createAxiosInstance({
  isV2: false,
  disabledErrors: [INACTIVE_ERROR_MESSAGE, DEPOSIT_TOO_SMALL],
});
