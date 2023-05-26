export function checkInclusiveStrings(inclusive: string, strings: string[]) {
  return strings.map((s) => s.includes(inclusive)).every((e) => e === true);
}
