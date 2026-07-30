import mongoose from 'mongoose';

const clientIssueSchema = new mongoose.Schema({
  kind: {
    type: String,
    enum: ['runtime_error', 'unhandled_rejection', 'api_error', 'resource_error', 'manual'],
    default: 'runtime_error',
  },
  message: { type: String, required: true, maxlength: 1000 },
  stack: { type: String, maxlength: 5000 },
  source: { type: String, maxlength: 500 },
  lineno: Number,
  colno: Number,
  path: { type: String, maxlength: 600 },
  url: { type: String, maxlength: 1200 },
  userAgent: { type: String, maxlength: 700 },
  viewport: {
    width: Number,
    height: Number,
  },
  buildId: { type: String, maxlength: 200 },
  status: Number,
  method: { type: String, maxlength: 20 },
  endpoint: { type: String, maxlength: 600 },
  fingerprint: { type: String, index: true },
  ipHash: { type: String, index: true },
  extra: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

clientIssueSchema.index({ createdAt: -1 });
clientIssueSchema.index({ kind: 1, createdAt: -1 });
clientIssueSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model('ClientIssue', clientIssueSchema);
