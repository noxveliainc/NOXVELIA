export function getImageUrl(image, preferred = 'medium') {
  if (!image) return '';
  if (typeof image === 'string') return image;
  if (image.urls?.[preferred]) return image.urls[preferred];
  if (image.variants?.[preferred]?.url) return image.variants[preferred].url;
  if (image.url) return image.url;
  return image.urls?.large || image.urls?.original || image.urls?.thumbnail || '';
}

export function getImageSrcSet(image) {
  if (!image || typeof image === 'string') return '';
  const candidates = [
    ['thumbnail', 400],
    ['medium', 800],
    ['large', 1280],
    ['original', 1920],
  ];
  return candidates
    .map(([name, width]) => {
      const url = image.urls?.[name] || image.variants?.[name]?.url;
      const actualWidth = image.variants?.[name]?.width || width;
      return url ? `${url} ${actualWidth}w` : '';
    })
    .filter(Boolean)
    .join(', ');
}

export function getImageDimensions(image, fallback = {}) {
  if (!image || typeof image === 'string') return fallback;
  return {
    width: image.width || fallback.width,
    height: image.height || fallback.height,
  };
}

export function normalizeUploadedImages(responseData) {
  if (Array.isArray(responseData?.images) && responseData.images.length) return responseData.images;
  if (Array.isArray(responseData?.urls)) return responseData.urls;
  if (responseData?.url) return [responseData.url];
  return [];
}
