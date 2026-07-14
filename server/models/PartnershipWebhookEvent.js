import mongoose from 'mongoose';

const partnershipWebhookEventSchema = new mongoose.Schema({
  eventId: { type: String, required: true, unique: true, index: true },
  type: { type: String, trim: true, default: '', index: true },
  resendEmailId: { type: String, trim: true, default: '', index: true },
  payload: { type: mongoose.Schema.Types.Mixed },
  processedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('PartnershipWebhookEvent', partnershipWebhookEventSchema);
