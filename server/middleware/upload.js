import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../services/cloudinary.js';

// Configurar o motor de armazenamento otimizado com compressão dinâmica
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portal_anuncios',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    // ⚡ OTIMIZAÇÃO: Transforma e comprime o peso do ficheiro na nuvem de forma nativa e paralela
    transformation: [
      { width: 1200, height: 900, crop: 'limit', quality: 'auto:good', fetch_format: 'auto' }
    ]
  },
});

// Inicializar o Multer de forma assíncrona
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Proteção: Limite de 5mb por payload de foto
});

export default upload;