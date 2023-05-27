import { describe, expect, it } from "vitest";
import { checkInclusiveStrings } from "./checkInclusiveStrings";

describe("inclusive strings", () => {
  it("works with empty", () => {
    const str = "";
    const strings = ["ab", "bc"];

    expect(checkInclusiveStrings(str, strings)).toBe(true);
  });

  it("works with words", () => {
    const str = "word";

    const strings = ["wordly", "abobus"];

    expect(checkInclusiveStrings(str, strings)).toBe(true);
  });

  it("doesnt work", () => {
    const str = "xxxxx";

    const strings = ["banana", "apple"];

    expect(checkInclusiveStrings(str, strings)).toBe(false);
  });
});
