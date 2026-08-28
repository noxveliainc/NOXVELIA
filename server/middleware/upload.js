import multer from 'multer';
import { ALLOWED_IMAGE_MIME_TYPES, IMAGE_UPLOAD_LIMITS, normalizeImageKind } from '../config/imageStorage.js';

const storage = multer.memoryStorage();

// 🔥 LIMITE AUMENTADO PARA 100MB (100 * 1024 * 1024 bytes)
const MAX_FILE_SIZE = 100 * 1024 * 1024;

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: IMAGE_UPLOAD_LIMITS.maxFilesPerRequest || 20,
    fields: 10,
    parts: (IMAGE_UPLOAD_LIMITS.maxFilesPerRequest || 20) + 10,
  },
  fileFilter: (req, file, callback) => {
    if (!ALLOWED_IMAGE_MIME_TYPES.has(file.mimetype)) {
      return callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname));
    }
    
    // 🔥 Garante que a soma total do pedido não ultrapassa os 100MB
    if (Number(req.headers['content-length'] || 0) > MAX_FILE_SIZE) {
      return callback(new multer.MulterError('LIMIT_FILE_SIZE', file.fieldname));
    }
    
    return callback(null, true);
  },
});

export default upload;