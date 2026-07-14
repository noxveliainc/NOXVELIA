import mongoose from 'mongoose';

const partnershipSuppressionSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  motivo: { type: String, trim: true, default: 'unsubscribe' },
  origem: { type: String, trim: true, default: 'admin' },
  contact: { type: mongoose.Schema.Types.ObjectId, ref: 'PartnershipContact' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('PartnershipSuppression', partnershipSuppressionSchema);
