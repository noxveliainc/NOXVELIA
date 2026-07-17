import mongoose from 'mongoose';

export const FUNNEL_EVENTS = [
  'landing_view',
  'search_start',
  'listing_view',
  'whatsapp_click',
  'publish_start',
  'publish_complete',
];

const funnelEventSchema = new mongoose.Schema({
  event: { type: String, enum: FUNNEL_EVENTS, required: true, index: true },
  sessionId: { type: String, required: true, index: true },
  path: { type: String, trim: true, default: '' },
  vertical: { type: String, enum: ['all', 'carro', 'imovel'], default: 'all', index: true },
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Anuncio', default: null },
  dayKey: { type: String, required: true, index: true },
  occurredAt: { type: Date, default: Date.now, index: true },
}, { versionKey: false });

funnelEventSchema.index({ event: 1, occurredAt: -1 });
funnelEventSchema.index({ dayKey: 1, event: 1, sessionId: 1 });

export default mongoose.model('FunnelEvent', funnelEventSchema);
