export type PreloadOptions = {
  timeoutMs?: number;
  onProgress?: (loaded: number, total: number, url?: string) => void;
};

/**
 * Preload a list of images. Resolves when all load, or when timeoutMs is reached.
 * By default, a 10000ms safety timeout prevents hanging forever on bad networks.
 */
export function preloadImages(urls: string[], opts: PreloadOptions = {}): Promise<void> {
  const { timeoutMs = 10000, onProgress } = opts;
  const unique = Array.from(new Set(urls.filter(Boolean)));
  if (unique.length === 0) return Promise.resolve();

  let loaded = 0;
  let settled = false;
  const mark = (url?: string) => {
    loaded += 1;
    onProgress?.(loaded, unique.length, url);
    if (!settled && loaded >= unique.length) {
      settled = true;
      clearTimeout(timer);
      resolveAll();
    }
  };

  let resolveAll!: () => void;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const promise = new Promise<void>((resolve) => {
    resolveAll = resolve;
    if (timeoutMs > 0) {
      timer = setTimeout(() => {
        if (!settled) {
          settled = true;
          resolve();
        }
      }, timeoutMs);
    }
  });

  unique.forEach((src) => {
    const img = new Image();
    const done = () => {
      img.onload = null;
      img.onerror = null;
      mark(src);
    };
    img.onload = done;
    img.onerror = done; // consider errored ones as "done" to avoid blocking forever
    img.src = src;
  });

  return promise;
}
