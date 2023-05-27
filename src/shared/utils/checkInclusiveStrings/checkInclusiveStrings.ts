export function checkInclusiveStrings(inclusive: string, strings: string[]) {
  const res = strings.some((s) =>
    s.toLowerCase().includes(inclusive.toLowerCase())
  );

  return res;
}
