// Wrapper leve de analytics. Nunca lança erro — se não existir nenhuma
// plataforma de analytics instalada, simplesmente não faz nada.
// Cobre os eventos pedidos: landing_view, click_publish, click_explore_cars,
// click_explore_properties, click_send_listing, click_dealer, search_submit, faq_open.
const trackEvent = (name, payload = {}) => {
  try {
    if (typeof window === 'undefined') return;

    if (typeof window.gtag === 'function') {
      window.gtag('event', name, payload);
      return;
    }

    if (typeof window.plausible === 'function') {
      window.plausible(name, { props: payload });
      return;
    }

    if (window.analytics && typeof window.analytics.track === 'function') {
      window.analytics.track(name, payload);
    }
  } catch {
    // analytics nunca deve quebrar a página
  }
};

export default trackEvent;