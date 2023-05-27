
import { ICurrency, IMinimalAmount } from "../types/currency.types";
import { INACTIVE_ERROR_MESSAGE, instance } from "./axiosCurrencyInstance";



export async function getMinimalAmount(
  leftCur: ICurrency,
  rightCur: ICurrency
) {
  const { data } = await instance
    .get<IMinimalAmount>(`/min-amount/${leftCur.ticker}_${rightCur.ticker}`)
    .catch((e) => {
      if (e.response.data?.error === INACTIVE_ERROR_MESSAGE)
        throw new Error(INACTIVE_ERROR_MESSAGE);
      return e;
    });

  return data.minAmount;
}
