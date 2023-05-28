import { createPinia, setActivePinia } from "pinia";
import { useExchangerStore } from "./useExchangerStore";

import { setupServer } from "msw/node";
import { rest } from "msw";

import { IEstimatedAmount, IFullCurrency } from "../../types/currency.types";
import { pickFields } from "@/shared/utils/pickFields/pickFields";

const currencies: IFullCurrency[] = [
  {
    ticker: "btc",
    name: "Bitcoin",
    image: "https://changenow.io/images/coins/btc.svg",
    hasExternalId: false,
    isFiat: false,
    featured: true,
    isStable: false,
    supportsFixedRate: true,
  },
  {
    ticker: "eth",
    name: "Ethereum",
    image: "https://changenow.io/images/coins/eth.svg",
    hasExternalId: false,
    isFiat: false,
    featured: true,
    isStable: false,
    supportsFixedRate: true,
  },
  {
    ticker: "xrp",
    name: "Ripple",
    image: "https://changenow.io/images/coins/xrp.svg",
    hasExternalId: true,
    isFiat: false,
    featured: false,
    isStable: false,
    supportsFixedRate: true,
  },
  {
    ticker: "ltc",
    name: "Litecoin",
    image: "https://changenow.io/images/coins/ltc.svg",
    hasExternalId: false,
    isFiat: false,
    featured: false,
    isStable: false,
    supportsFixedRate: true,
  },
  {
    ticker: "bch",
    name: "BitcoinCash",
    image: "https://changenow.io/images/coins/bch.svg",
    hasExternalId: false,
    isFiat: false,
    featured: true,
    isStable: false,
    supportsFixedRate: true,
  },
  {
    ticker: "bnb",
    name: "Binance Coin (ERC20)",
    image: "https://changenow.io/images/coins/bnb.svg",
    hasExternalId: false,
    isFiat: false,
    featured: false,
    isStable: false,
    supportsFixedRate: false,
  },
  {
    ticker: "bnbmainnet",
    name: "Binance Coin Mainnet",
    image: "https://changenow.io/images/coins/bnbmainnet.svg",
    hasExternalId: true,
    isFiat: false,
    featured: false,
    isStable: false,
    supportsFixedRate: true,
  },
  {
    ticker: "usdt",
    name: "Tether (OMNI)",
    image: "https://changenow.io/images/coins/usdt.svg",
    hasExternalId: false,
    isFiat: false,
    featured: false,
    isStable: true,
    supportsFixedRate: true,
  },
  {
    ticker: "usdterc20",
    name: "Tether (ERC-20)",
    image: "https://changenow.io/images/coins/usdterc20.svg",
    hasExternalId: false,
    isFiat: false,
    featured: false,
    isStable: true,
    supportsFixedRate: true,
  },
  {
    ticker: "eos",
    name: "EOS",
    image: "https://changenow.io/images/coins/eos.svg",
    hasExternalId: true,
    isFiat: false,
    featured: false,
    isStable: false,
    supportsFixedRate: true,
  },
];

const pickedArray = currencies.map((c) =>
  pickFields(c, ["name", "image", "ticker"])
);

export const restHandlers = [
  rest.get(
    "https://api.changenow.io/v1/currencies?active=true&fixedRate=true",
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(currencies));
    }
  ),

  rest.get(
    `https://api.changenow.io/v1/exchange-amount/1/btc_eth/?api_key=52da871cb5197290b2309005563be0685100b33fe986056fd1177899d7c814cb}`,
    (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          estimatedAmount: 20,
          warningMessage: null,
        } as IEstimatedAmount)
      );
    }
  ),

  rest.get(
    `https://api.changenow.io/v1/min-amount/btc_eth/?api_key=52da871cb5197290b2309005563be0685100b33fe986056fd1177899d7c814cb`,
    (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          minAmount: 0.9,
        })
      );
    }
  ),

  rest.get(
    `https://api.changenow.io/v1/min-amount/eth_btc/?api_key=52da871cb5197290b2309005563be0685100b33fe986056fd1177899d7c814cb`,
    (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          minAmount: 0.9,
        })
      );
    }
  ),
];

const server = setupServer(...restHandlers);

describe("axios instance", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

  //  Close server after all tests
  afterAll(() => server.close());

  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers());

  it("has initial state", () => {
    const minimalAmount = {
      fromLeft: 0,
      fromRight: 0,
    };
    const store = useExchangerStore();

    expect(store.currencies).toEqual([]);

    expect(store.leftCurrency.value).toBe("");
    expect(store.rightCurrency.value).toBe("");
    expect(store.minimalAmount).toEqual(minimalAmount);

    expect(store.isLoading).toBe(false);
    expect(store.warning).toBe(null);
  });

  it("loads data and sets currencies and minimals", async () => {
    const store = useExchangerStore();

    await store.getCurrencies().catch((e) => console.log(e));

    expect(store.currencies).toHaveLength(currencies.length);

    expect(store.leftCurrency.currency).toEqual(pickedArray[0]);

    expect(store.rightCurrency.currency).toEqual(pickedArray[1]);

    //? Тут мои тесты закончились, потому что оно почему-то не стабает гет минимал эмаунт :(
  });
});
