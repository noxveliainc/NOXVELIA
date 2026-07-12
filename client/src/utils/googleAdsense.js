const ADSENSE_SCRIPT_ID = 'noxvelia-google-adsense';

let adsenseScriptPromise = null;

export const ADSENSE_CLIENT = String(import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT || '').trim();
export const ADSENSE_TEST_MODE = String(import.meta.env.VITE_GOOGLE_ADSENSE_TEST_MODE || '').toLowerCase() === 'true';

const slots = {
  landing_between_highlights: import.meta.env.VITE_GOOGLE_ADSENSE_SLOT_LANDING,
  search_results_top: import.meta.env.VITE_GOOGLE_ADSENSE_SLOT_SEARCH,
  listing_before_suggestions: import.meta.env.VITE_GOOGLE_ADSENSE_SLOT_DETAIL,
};

export const isAdsenseConfigured = /^ca-pub-\d+$/.test(ADSENSE_CLIENT);

export const getAdsenseSlot = (placement) => String(slots[placement] || '').trim();

export const blocksAdsByPrivacySignal = () => {
  const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
  return navigator.globalPrivacyControl === true || dnt === '1' || dnt === 'yes';
};

export const ensureAdsenseScript = () => {
  if (!isAdsenseConfigured) return Promise.reject(new Error('Google AdSense client is not configured.'));
  if (adsenseScriptPromise) return adsenseScriptPromise;
  if (document.getElementById(ADSENSE_SCRIPT_ID)) return Promise.resolve();

  adsenseScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = ADSENSE_SCRIPT_ID;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADSENSE_CLIENT)}`;
    script.onload = () => resolve();
    script.onerror = () => {
      adsenseScriptPromise = null;
      reject(new Error('Google AdSense script failed to load.'));
    };
    document.head.appendChild(script);
  });

  return adsenseScriptPromise;
};
