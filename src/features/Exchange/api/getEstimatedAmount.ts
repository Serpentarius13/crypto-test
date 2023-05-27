
import { ICurrency, IEstimatedAmount } from "../types/currency.types";
import { instance } from "./axiosCurrencyInstance";

export async function getEstimatedAmount(
  value: string,
  leftCur: ICurrency,
  rightCur: ICurrency
) {
  const { data } = await instance
    .get<IEstimatedAmount>(
      `/exchange-amount/${value}/${leftCur.ticker}_${rightCur.ticker}`
    )
    .catch();

  return data;
}
