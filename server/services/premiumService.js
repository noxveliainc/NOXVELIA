import Anuncio from '../models/Anuncio.js';
import User from '../models/User.js';

const filtroDestaquePremiumAutomatico = () => ({
  $or: [
    { dataExpiracaoDestaque: null },
    { dataExpiracaoDestaque: { $exists: false } },
    { dataExpiracaoDestaque: { $lt: new Date() } },
  ],
});

export const ativarPremiumUtilizador = async (userId, camposExtra = {}) => {
  const id = String(userId);

  const [utilizador] = await Promise.all([
    User.findByIdAndUpdate(
      id,
      {
        $set: {
          premiumAtivo: true,
          dataExpiracaoPremium: null,
          proximoPagamentoPremium: null,
          ...camposExtra,
        },
      },
      { new: true }
    ),
    Anuncio.updateMany(
      {
        utilizador: id,
        estado: 'ativo',
        ...filtroDestaquePremiumAutomatico(),
      },
      {
        $set: {
          destacado: true,
          dataExpiracaoDestaque: null,
          planoPublicacao: 'premium',
        },
      }
    ),
  ]);

  return utilizador;
};

export const desativarPremiumUtilizador = async (userId, camposExtra = {}) => {
  const id = String(userId);

  const [utilizador] = await Promise.all([
    User.findByIdAndUpdate(
      id,
      {
        $set: {
          premiumAtivo: false,
          dataExpiracaoPremium: new Date(),
          ...camposExtra,
          proximoPagamentoPremium: null,
        },
      },
      { new: true }
    ),
    Anuncio.updateMany(
      {
        utilizador: id,
        estado: { $ne: 'apagado' },
        ...filtroDestaquePremiumAutomatico(),
      },
      {
        $set: {
          destacado: false,
          dataExpiracaoDestaque: null,
          planoPublicacao: 'basico',
        },
      }
    ),
  ]);

  return utilizador;
};