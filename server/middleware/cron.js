import cron from 'node-cron';
import Anuncio from '../models/Anuncio.js';
import Notificacao from '../models/Notificacao.js';
import { sincronizarIntegracoesStockAtivas } from '../services/stockImportService.js';

export const iniciarCronJobs = () => {
  // Corre todos os dias à meia-noite
  cron.schedule('0 0 * * *', async () => {
    console.log('⏳ [CRON] A verificar destaques expirados...');
    try {
      const agora = new Date();
      
      const anunciosExpirados = await Anuncio.find({
        destacado: true,
        dataExpiracaoDestaque: { $lte: agora }
      });

      if (anunciosExpirados.length > 0) {
        console.log(`[CRON] Encontrados ${anunciosExpirados.length} destaques expirados.`);
        
        for (const anuncio of anunciosExpirados) {
          anuncio.destacado = false;
          await anuncio.save({ validateBeforeSave: false });

          // 🌟 CORREÇÃO: Adicionado 'tipo' e 'titulo' exigidos pelo teu Schema!
          await Notificacao.create({
            utilizador: anuncio.utilizador,
            tipo: 'destaque_expirado',
            titulo: 'Destaque Terminado',
            mensagem: `O destaque do teu anúncio "${anuncio.titulo}" terminou. Queres renovar para voltar ao topo?`,
            link: `/sucesso/${anuncio._id}`, 
            lida: false
          });
          
          console.log(`[CRON] Destaque removido: ${anuncio._id}`);
        }
      } else {
        console.log('[CRON] Nenhum destaque expirado hoje.');
      }
    } catch (error) {
      console.error('❌ [CRON] Erro ao verificar destaques:', error);
    }
  });
  cron.schedule('17 */6 * * *', async () => {
    if (process.env.STOCK_SYNC_CRON_ENABLED === 'false') return;
    console.log('[CRON] A sincronizar stocks automóveis configurados...');
    try {
      const resultados = await sincronizarIntegracoesStockAtivas({ limite: 8 });
      if (resultados.length) {
        const ok = resultados.filter((item) => item.ok).length;
        console.log(`[CRON] Stock sync concluído: ${ok}/${resultados.length} integrações com sucesso.`);
      } else {
        console.log('[CRON] Nenhuma integração de stock elegível para sincronizar agora.');
      }
    } catch (error) {
      console.error('[CRON] Erro ao sincronizar stocks automóveis:', error.message);
    }
  });
};