import { createAxiosInstance } from "./axiosInstance";

describe("axios instance", () => {
  it("works with key and v2", () => {
    const instance = createAxiosInstance({});

    const uri = instance.getUri();

    expect(uri).toBeTypeOf("string");
    expect(uri.includes("v2")).toBe(true);
    expect(uri.includes("api_key")).toBe(true);
  });

  it("works without key", () => {
    const instance = createAxiosInstance({ hasApiKey: false });

    expect(instance.getUri().includes("api_key")).toBe(false);
  });

  it("works with v1", () => {
    const instance = createAxiosInstance({ isV2: false });

    expect(instance.getUri().includes("v1")).toBe(true);
  });
});
