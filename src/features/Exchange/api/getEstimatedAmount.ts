import { axiosV1Key } from "@/shared/api/axiosInstance/axiosInstance";
import { ICurrency, IEstimatedAmount } from "../types/currency.types";

export async function getEstimatedAmount(
  value: string,
  leftCur: ICurrency,
  rightCur: ICurrency
) {
  const { data } = await axiosV1Key
    .get<IEstimatedAmount>(
      `/exchange-amount/${value}/${leftCur.ticker}_${rightCur.ticker}`
    )
    .catch();

  return data;
}
