import express from 'express';
import upload from '../middleware/upload.js'; // Puxa o middleware do Passo 1
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

// Aqui o 'upload' já foi importado e inicializado com sucesso no outro ficheiro
router.post('/imagens', verificarToken, upload.array('imagens', 6), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ sucesso: false, erro: 'Nenhuma imagem enviada.' });
    }

    const urls = req.files.map(file => file.path);
    
    return res.json({
      sucesso: true,
      urls: urls
    });
  } catch (error) {
    console.error('Erro no upload:', error);
    return res.status(500).json({ sucesso: false, erro: 'Erro interno no upload.' });
  }
});

export default router;