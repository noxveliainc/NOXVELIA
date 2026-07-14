import PartnershipAuditLog from '../models/PartnershipAuditLog.js';

export const auditPartnershipAction = async (req, action, { entity = '', entityId = '', details = {} } = {}) => {
  try {
    await PartnershipAuditLog.create({
      admin: req?.user?.id,
      action,
      entity,
      entityId: String(entityId || ''),
      details,
      ip: req?.ip || '',
      userAgent: req?.get?.('user-agent') || '',
    });
  } catch (error) {
    console.warn('[PARTNERSHIPS] Falha ao registar auditoria:', error.message);
  }
};
