import { axiosV1Key } from "@/shared/api/axiosInstance/axiosInstance";
import { ICurrency, IMinimalAmount } from "../types/currency.types";

export async function getMinimalAmount(
  leftCur: ICurrency,
  rightCur: ICurrency
) {
  const { data } = await axiosV1Key
    .get<IMinimalAmount>(`/min-amount/${leftCur.ticker}_${rightCur.ticker}`)
    .catch();
  return data.minAmount;
}
