export async function sleep(ms: number | string) {
  return new Promise((r) => setTimeout(r, +ms));
}
