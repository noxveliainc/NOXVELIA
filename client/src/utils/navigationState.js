const PRIVATE_ROUTE_PREFIXES = [
  '/admin',
  '/editar',
  '/favoritos',
  '/mensagens',
  '/perfil',
  '/planos',
  '/publicar',
  '/sucesso',
];

export const pathWithSearch = (location) => {
  const pathname = location?.pathname || '/';
  const search = location?.search || '';
  return `${pathname}${search}`;
};

export const isPrivatePath = (path = '') => {
  if (!path) return false;
  return PRIVATE_ROUTE_PREFIXES.some((route) => (
    path === route ||
    path.startsWith(`${route}/`) ||
    path.startsWith(`${route}?`)
  ));
};

export const publicReturnPath = (location, fallback = '/') => {
  const current = pathWithSearch(location);
  return isPrivatePath(current) ? fallback : current;
};

export const publishIntentState = (location, fallback = '/') => ({
  from: '/publicar',
  returnTo: publicReturnPath(location, fallback),
});

export const loginBackPath = (state, fallback = '/') => {
  const returnTo = typeof state?.returnTo === 'string' ? state.returnTo : '';
  if (returnTo && !isPrivatePath(returnTo)) return returnTo;

  const from = typeof state?.from === 'string' ? state.from : '';
  if (from && !isPrivatePath(from)) return from;

  return fallback;
};

export const loginDestinationPath = (state, fallback = '/') => {
  const from = typeof state?.from === 'string' ? state.from : '';
  return from || fallback;
};
