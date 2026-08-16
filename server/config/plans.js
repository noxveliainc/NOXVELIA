export const LIMITE_ANUNCIOS_PARTICULAR = 5;

export const PLANOS_CONTA = {
  particular: {
    codigo: 'particular',
    nome: 'Particular',
    limiteAnunciosAtivos: LIMITE_ANUNCIOS_PARTICULAR,
    destaqueAutomatico: false,
    stockProfissional: false,
    analytics: 'basico',
  },
  pro: {
    codigo: 'pro',
    nome: 'PRO',
    limiteAnunciosAtivos: null,
    destaqueAutomatico: true,
    stockProfissional: true,
    analytics: 'avancado',
  },
};

export const userHasProAccess = (user) => user?.tipo === 'admin' || user?.premiumAtivo === true;

export const getFreeListingLimit = (user) => {
  const limiteDefinido = Number(user?.limiteAnuncios);
  if (Number.isFinite(limiteDefinido) && limiteDefinido > LIMITE_ANUNCIOS_PARTICULAR) {
    return Math.floor(limiteDefinido);
  }
  return LIMITE_ANUNCIOS_PARTICULAR;
};

export const buildPlanPayloadForUser = (user) => {
  const proAtivo = userHasProAccess(user);
  const planoBase = proAtivo ? PLANOS_CONTA.pro : PLANOS_CONTA.particular;
  const limiteAnunciosAtivos = proAtivo ? null : getFreeListingLimit(user);

  return {
    ...planoBase,
    limiteAnunciosAtivos,
    ilimitado: proAtivo,
    proAtivo,
    premiumAtivo: user?.premiumAtivo === true,
    admin: user?.tipo === 'admin',
    tipoConta: user?.tipoConta || 'particular',
  };
};