export const useSleep = (ms: number) =>
  new Promise((r) => setTimeout(r, ms * 100));
