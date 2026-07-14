import mongoose from 'mongoose';

const imageVariantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  storageKey: { type: String, required: true, trim: true },
  url: { type: String, trim: true, default: '' },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  sizeBytes: { type: Number, required: true },
  format: { type: String, default: 'webp' },
  mimeType: { type: String, default: 'image/webp' },
}, { _id: false });

const imageAssetSchema = new mongoose.Schema({
  ownerType: {
    type: String,
    enum: ['listing', 'user', 'company', 'temporary', 'system'],
    default: 'temporary',
    index: true,
  },
  ownerId: { type: mongoose.Schema.Types.ObjectId, index: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  storageProvider: { type: String, enum: ['local', 's3'], required: true },
  storageKey: { type: String, required: true, unique: true, trim: true },
  originalFilename: { type: String, trim: true, default: '' },
  originalMimeType: { type: String, trim: true, default: '' },
  finalMimeType: { type: String, trim: true, default: 'image/webp' },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  sizeBytes: { type: Number, required: true },
  checksum: { type: String, required: true, index: true },
  blurDataURL: { type: String, default: '' },
  altText: { type: String, trim: true, maxlength: 180, default: '' },
  sortOrder: { type: Number, default: 0, index: true },
  isPrimary: { type: Boolean, default: false, index: true },
  processingStatus: {
    type: String,
    enum: ['pending', 'processed', 'failed', 'deleted'],
    default: 'processed',
    index: true,
  },
  variants: { type: [imageVariantSchema], default: [] },
  legacySourceUrl: { type: String, trim: true, default: '' },
  migrationStatus: {
    type: String,
    enum: ['none', 'pending', 'migrated', 'failed', 'skipped'],
    default: 'none',
    index: true,
  },
  migrationError: { type: String, trim: true, default: '' },
  deletedAt: { type: Date, default: null, index: true },
}, { timestamps: true });

imageAssetSchema.index({ ownerType: 1, ownerId: 1, sortOrder: 1 });
imageAssetSchema.index({ uploadedBy: 1, createdAt: -1 });

export default mongoose.model('ImageAsset', imageAssetSchema);
