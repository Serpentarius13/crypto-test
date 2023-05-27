export function debounce<T>(fn: () => T, delay: number): () => void {
  let isCooldown = false;

  return function () {
    if (isCooldown) return;

    //@ts-expect-error
    fn.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => (isCooldown = false), delay);
  };
}
