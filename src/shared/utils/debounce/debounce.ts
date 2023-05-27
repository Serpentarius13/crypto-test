export function debounce<T>(func: (any: any) => Promise<T> | T | void, delay: number) {
  let timeoutId: NodeJS.Timeout;

  return function (...args: any[]) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      //@ts-expect-error
      func.apply(this, args);
    }, delay);
  };
}
