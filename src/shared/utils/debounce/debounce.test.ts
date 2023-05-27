import { debounce } from "./debounce";

describe("debounce", () => {
  it("works", async () => {
    let str = "";

    const fn = () => (str += "1");

    const debouncedFn = debounce(fn, 1000);

    debouncedFn();

    await new Promise((r) => setTimeout(r, 1100));

    expect(str).toBe("1");

    debouncedFn();

    expect(str).toBe("1");

    await new Promise((r) => setTimeout(r, 1000));

    debouncedFn();

    expect(str).toBe("11");
  });
});
