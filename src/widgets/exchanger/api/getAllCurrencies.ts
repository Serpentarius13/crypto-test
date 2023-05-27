import { axiosV1Key } from "@/shared/api/axiosInstance/axiosInstance";

import { ICurrency } from "../../../features/Exchange/types/currency.types";

export async function getAllCurrencies() {
  const { data } = await axiosV1Key.get<ICurrency[]>("/currencies?active=true").catch();

  return data;
}
