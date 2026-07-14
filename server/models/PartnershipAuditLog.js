import mongoose from 'mongoose';

const partnershipAuditLogSchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true, trim: true, index: true },
  entity: { type: String, trim: true, default: '' },
  entityId: { type: String, trim: true, default: '' },
  details: { type: mongoose.Schema.Types.Mixed },
  ip: { type: String, trim: true, default: '' },
  userAgent: { type: String, trim: true, default: '' },
}, { timestamps: true });

partnershipAuditLogSchema.index({ createdAt: -1 });

export default mongoose.model('PartnershipAuditLog', partnershipAuditLogSchema);
