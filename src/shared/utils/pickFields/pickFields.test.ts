import { describe, expect, it, beforeEach } from "vitest";
import { pickFields } from "./pickFields";

const obj = {
  a: "a",
  b: "b",
  c: "c",
};

describe("env with error", () => {
  it("works", () => {
    const picked = pickFields(obj, ["a"]);

    expect(Object.keys(picked)).toHaveLength(1);
    expect(Object.keys(picked)[0]).toBe("a");
  });

  it("works with empty array", () => {
    const picked = pickFields(obj, []);

    expect(picked).toEqual({});
  });
});
