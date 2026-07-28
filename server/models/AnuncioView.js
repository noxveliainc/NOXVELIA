import mongoose from 'mongoose';

const anuncioViewSchema = new mongoose.Schema({
  anuncio: { type: mongoose.Schema.Types.ObjectId, ref: 'Anuncio', required: true, index: true },
  visitorKey: { type: String, required: true },
  dayKey: { type: String, required: true, index: true },
  viewedAt: { type: Date, default: Date.now, index: true },
}, { versionKey: false });

anuncioViewSchema.index({ anuncio: 1, visitorKey: 1, dayKey: 1 }, { unique: true });
anuncioViewSchema.index({ viewedAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 120 });

export default mongoose.model('AnuncioView', anuncioViewSchema);