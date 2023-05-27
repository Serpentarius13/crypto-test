

import { ICurrency } from "../../../features/Exchange/types/currency.types";
import { instance } from "./axiosCurrencyInstance";

export async function getAllCurrencies() {
  const { data } = await instance.get<ICurrency[]>("/currencies?active=true").catch();

  return data;
}
