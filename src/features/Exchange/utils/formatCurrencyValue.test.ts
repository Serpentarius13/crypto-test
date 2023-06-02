import { formatCurrencyValue } from "./formatCurrencyValue";

describe("format currency value", () => {
  it("works", () => {
    const currency = {
      value: "123.183182381823818238-e",
    };

    expect(formatCurrencyValue(currency)).toBe("123.183182");
  });

  it("works with natural", () => {
    const currency = {
      value: "123123",
    };

    expect(formatCurrencyValue(currency)).toBe("123123");
  });
});
