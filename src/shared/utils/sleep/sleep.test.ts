import { describe, expect, it, beforeEach } from "vitest";
import { sleep } from "./sleep";

describe("env with error", () => {
  it("works", async () => {
    let value = "";

    sleep(1000).then(() => (value += "1"));

    expect(value).toBe("");

    await new Promise((r) => setTimeout(r, 1000));

    expect(value).toBe("1");
  });
});
