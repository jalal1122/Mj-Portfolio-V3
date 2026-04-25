const allowedRemoteHosts = new Set(["res.cloudinary.com", "images.unsplash.com"]);

const legacyPortraitPaths = new Set(["jkimage.jpeg", "/jkimage.jpeg","jkimage.jpg", "/jkimage.jpg"]);

export function getSafeImageSrc(src: string | undefined | null, fallback = "/jkimage.jpeg") {
  const value = src?.trim();
  if (!value) {
    return fallback;
  }

  const lower = value.toLowerCase();
  const normalizedPath = lower.split("?")[0].split("#")[0];
  if (legacyPortraitPaths.has(normalizedPath) || normalizedPath.endsWith("/jkimage.png") || normalizedPath.endsWith("/jkimage.jpg")) {
    return fallback;
  }

  if (!value.startsWith("/") && !lower.startsWith("http://") && !lower.startsWith("https://")) {
    return fallback;
  }

  if (lower.startsWith("http://") || lower.startsWith("https://")) {
    try {
      const { hostname } = new URL(value);
      if (!allowedRemoteHosts.has(hostname)) {
        return fallback;
      }
    } catch {
      return fallback;
    }
  }

  return value;
}
