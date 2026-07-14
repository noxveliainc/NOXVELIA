import mongoose from 'mongoose';

const partnershipReplySchema = new mongoose.Schema({
  fromEmail: { type: String, lowercase: true, trim: true, index: true },
  fromName: { type: String, trim: true, default: '' },
  toEmail: { type: String, lowercase: true, trim: true, default: '' },
  subject: { type: String, trim: true, default: '' },
  text: { type: String, trim: true, default: '' },
  html: { type: String, trim: true, default: '' },
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'PartnershipCampaign' },
  contact: { type: mongoose.Schema.Types.ObjectId, ref: 'PartnershipContact' },
  send: { type: mongoose.Schema.Types.ObjectId, ref: 'PartnershipEmailSend' },
  eventId: { type: String, unique: true, sparse: true },
  receivedAt: { type: Date, default: Date.now },
}, { timestamps: true });

partnershipReplySchema.index({ receivedAt: -1 });

export default mongoose.model('PartnershipReply', partnershipReplySchema);
