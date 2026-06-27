import express from 'express';
import Anuncio from '../models/Anuncio.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/anuncio/:id', verificarToken, async (req, res) => {
  try {
    const anuncio = await Anuncio.findOne({ _id: req.params.id, utilizador: req.user.id });
    if (!anuncio) return res.status(404).json({ erro: 'Anúncio não encontrado ou revogado.' });

    // Gerar array dos últimos 7 dias garantindo dados estruturados
    const ultimos7Dias = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dataStr = d.toISOString().split('T')[0]; // YYYY-MM-DD
      
      const registoOriginal = anuncio.historicoVisitas.find(h => h.data === dataStr);
      ultimos7Dias.push({
        dataLabel: d.toLocaleDateString('pt-PT', { weekday: 'short', day: 'numeric' }),
        visitas: registoOriginal ? registoOriginal.quantidade : 0
      });
    }

    res.json({
      totalVisitas: anuncio.visitas || 0,
      contactosGerados: anuncio.contactos || 0,
      guardadoEmFavoritos: anuncio.guardados || 0,
      graficoSeteDias: ultimos7Dias
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao computar métricas analíticas.' });
  }
});

export default router;