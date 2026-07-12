const YOUTUBE_HOSTS = new Set(['youtube.com', 'm.youtube.com', 'youtu.be', 'youtube-nocookie.com']);

const cleanHost = (hostname) => hostname.toLowerCase().replace(/^www\./, '');
const validId = (value) => /^[a-zA-Z0-9_-]{6,32}$/.test(value || '');

export const getVideoEmbedData = (rawUrl) => {
  if (!rawUrl || typeof rawUrl !== 'string') return null;

  try {
    const url = new URL(rawUrl.trim());
    if (!['http:', 'https:'].includes(url.protocol)) return null;

    const host = cleanHost(url.hostname);
    if (YOUTUBE_HOSTS.has(host)) {
      let videoId = '';
      if (host === 'youtu.be') videoId = url.pathname.split('/').filter(Boolean)[0] || '';
      else if (url.pathname === '/watch') videoId = url.searchParams.get('v') || '';
      else {
        const parts = url.pathname.split('/').filter(Boolean);
        if (['embed', 'shorts', 'live'].includes(parts[0])) videoId = parts[1] || '';
      }

      if (!validId(videoId)) return null;
      return {
        provider: 'YouTube',
        embedUrl: 'https://www.youtube-nocookie.com/embed/' + videoId,
        title: 'Vídeo do anúncio no YouTube',
      };
    }

    if (host === 'my.matterport.com' && url.pathname.startsWith('/show')) {
      const modelId = url.searchParams.get('m') || '';
      if (!validId(modelId)) return null;
      return {
        provider: 'Matterport',
        embedUrl: 'https://my.matterport.com/show/?m=' + encodeURIComponent(modelId) + '&play=1',
        title: 'Tour virtual Matterport',
      };
    }
  } catch {
    return null;
  }

  return null;
};

export const isSupportedVideoUrl = (url) => !url || Boolean(getVideoEmbedData(url));
