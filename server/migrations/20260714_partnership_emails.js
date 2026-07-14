import PartnershipAuditLog from '../models/PartnershipAuditLog.js';
import PartnershipCampaign from '../models/PartnershipCampaign.js';
import PartnershipContact from '../models/PartnershipContact.js';
import PartnershipEmailSend from '../models/PartnershipEmailSend.js';
import PartnershipReply from '../models/PartnershipReply.js';
import PartnershipSettings from '../models/PartnershipSettings.js';
import PartnershipSuppression from '../models/PartnershipSuppression.js';
import PartnershipWebhookEvent from '../models/PartnershipWebhookEvent.js';
import { getPartnershipEnv } from '../services/partnershipConfig.js';

export const name = '20260714_partnership_emails';

export const up = async () => {
  await Promise.all([
    PartnershipContact.syncIndexes(),
    PartnershipCampaign.syncIndexes(),
    PartnershipEmailSend.syncIndexes(),
    PartnershipSuppression.syncIndexes(),
    PartnershipSettings.syncIndexes(),
    PartnershipAuditLog.syncIndexes(),
    PartnershipWebhookEvent.syncIndexes(),
    PartnershipReply.syncIndexes(),
  ]);

  const env = getPartnershipEnv();
  await PartnershipSettings.findOneAndUpdate(
    { key: 'default' },
    {
      $setOnInsert: {
        key: 'default',
        limiteDiario: 40,
        tamanhoLote: 5,
        intervaloLotesSegundos: 60,
        remetente: env.defaultFrom,
        replyTo: env.defaultReplyTo,
        logoUrl: env.logoUrl,
        trackingAberturas: true,
        trackingCliques: true,
      },
    },
    { upsert: true }
  );
};
