import multer from 'multer';
import { ALLOWED_IMAGE_MIME_TYPES, IMAGE_UPLOAD_LIMITS, imageConfigForKind, normalizeImageKind } from '../config/imageStorage.js';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: imageConfigForKind('listing').maxInputBytes,
    files: IMAGE_UPLOAD_LIMITS.maxFilesPerRequest,
    fields: 10,
    parts: IMAGE_UPLOAD_LIMITS.maxFilesPerRequest + 10,
  },
  fileFilter: (req, file, callback) => {
    const kind = normalizeImageKind(req.body?.kind || req.query?.kind || 'listing');
    const maxBytes = imageConfigForKind(kind).maxInputBytes;
    if (!ALLOWED_IMAGE_MIME_TYPES.has(file.mimetype)) {
      return callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname));
    }
    if (Number(req.headers['content-length'] || 0) > maxBytes * IMAGE_UPLOAD_LIMITS.maxFilesPerRequest) {
      return callback(new multer.MulterError('LIMIT_FILE_SIZE', file.fieldname));
    }
    return callback(null, true);
  },
});

export default upload;
