import createCache from "@emotion/cache";

const isBrowser = typeof document !== "undefined";

function getMeta(metaName: string) {
  if (isBrowser) {
    const metas = document.getElementsByTagName("meta");

    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute("name") === metaName) {
        return metas[i] as HTMLElement;
      }
    }
  }

  return undefined;
}

export default function createEmotionCache() {
  return createCache({
    key: "css",
    // insertionPoint: getMeta("emotion-insertion-point"),
    prepend: true,
  });
}
