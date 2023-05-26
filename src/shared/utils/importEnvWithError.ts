export function importEnvWithError(key: string): string {
  const value = import.meta.env[key];

  if (typeof value !== "string") throw new Error("no base url provided");

  return value;
}
