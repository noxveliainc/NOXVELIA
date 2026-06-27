import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// 1. Configuração base que já tinhas (Impecável)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Criar o motor de armazenamento do Multer direcionado para o Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'NOXVELIA_uploads', // Nome da pasta que vai ser criada no teu painel do Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, height: 900, crop: 'limit' }] // Comprime e otimiza o tamanho no ar
  },
});

// 3. Exportar o middleware pronto a interceptar requisições
export const uploadMiddleware = multer({ storage: storage });

export default cloudinary;