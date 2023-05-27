import { importEnvWithError } from "./importEnvWithError";

const check = "string";

describe("env with error", () => {
  beforeEach(() => {
    import.meta.env.check = check;
  });

  it("works", () => {
    const checkValue = importEnvWithError("check");

    expect(checkValue).toBe(check);
  });

  it("breaks", async () => {
    const asyncThrower = async () => importEnvWithError("other-value");
    await expect(asyncThrower()).rejects.toThrow();
  });
});
