// export function debounce<T>(fn: (any: any) => T, delay: number): () => void {
//   let isCooldown = false;

//   return function () {
//     if (isCooldown) return;

//     //@ts-expect-error
//     fn.apply(this, arguments);

//     isCooldown = true;

//     setTimeout(() => (isCooldown = false), delay);
//   };
// }

export function debounce<T>(func: () => Promise<T> | T | void, delay: number) {
  let timeoutId: NodeJS.Timeout;

  return function (...args: any[]) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      //@ts-expect-error
      func.apply(this, args);
    }, delay);
  };
}
