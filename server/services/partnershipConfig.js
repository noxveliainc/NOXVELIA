import PartnershipSettings from '../models/PartnershipSettings.js';
import { ensureHttpsUrl, parsePositiveInt, safeFromAddress, safeReplyTo } from './partnershipEmailUtils.js';

const DEFAULT_FROM = '"Noxvelia Parcerias" <geral@noxvelia.com>';
const DEFAULT_REPLY_TO = 'geral@noxvelia.com';
const DEFAULT_APP_URL = 'https://www.noxvelia.com';

export const getPartnershipEnv = () => {
  const appUrl = ensureHttpsUrl(process.env.APP_URL || process.env.CLIENT_URL || DEFAULT_APP_URL, { allowEmpty: false }) || DEFAULT_APP_URL;
  const apiUrl = ensureHttpsUrl(process.env.PUBLIC_API_URL || process.env.API_URL || process.env.SERVER_URL || `${appUrl.replace(/\/$/, '')}/api`, { allowEmpty: false }) || `${appUrl.replace(/\/$/, '')}/api`;
  return {
    appUrl: appUrl.replace(/\/$/, ''),
    apiUrl: apiUrl.replace(/\/$/, ''),
    resendApiKey: process.env.RESEND_API_KEY || '',
    transactionalFrom: process.env.RESEND_TRANSACTIONAL_FROM || '"NOXVELIA" <suporte@noxvelia.com>',
    defaultFrom: safeFromAddress(process.env.RESEND_PARTNERSHIPS_FROM || DEFAULT_FROM, DEFAULT_FROM),
    defaultReplyTo: safeReplyTo(process.env.RESEND_REPLY_TO || DEFAULT_REPLY_TO, DEFAULT_REPLY_TO),
    logoUrl: ensureHttpsUrl(process.env.EMAIL_LOGO_URL || `${appUrl.replace(/\/$/, '')}/logo-noxvelia.png`) || `${appUrl.replace(/\/$/, '')}/logo-noxvelia.png`,
    unsubscribeSecret: process.env.PARTNERSHIP_UNSUBSCRIBE_SECRET || process.env.JWT_SECRET || '',
    webhookSecret: process.env.RESEND_WEBHOOK_SECRET || '',
  };
};

export const getPartnershipSettings = async () => {
  const env = getPartnershipEnv();
  const settings = await PartnershipSettings.findOneAndUpdate(
    { key: 'default' },
    {
      $setOnInsert: {
        key: 'default',
        limiteDiario: parsePositiveInt(process.env.PARTNERSHIP_DAILY_LIMIT, 40, { min: 1, max: 1000 }),
        tamanhoLote: parsePositiveInt(process.env.PARTNERSHIP_BATCH_SIZE, 5, { min: 1, max: 50 }),
        intervaloLotesSegundos: parsePositiveInt(process.env.PARTNERSHIP_BATCH_INTERVAL_SECONDS, 60, { min: 10, max: 3600 }),
        remetente: env.defaultFrom,
        replyTo: env.defaultReplyTo,
        logoUrl: env.logoUrl,
        trackingAberturas: true,
        trackingCliques: true,
      },
    },
    { upsert: true, new: true }
  ).lean();

  return {
    ...settings,
    remetente: safeFromAddress(settings.remetente, env.defaultFrom),
    replyTo: safeReplyTo(settings.replyTo, env.defaultReplyTo),
    logoUrl: ensureHttpsUrl(settings.logoUrl || env.logoUrl) || env.logoUrl,
    limiteDiario: parsePositiveInt(settings.limiteDiario, 40, { min: 1, max: 1000 }),
    tamanhoLote: parsePositiveInt(settings.tamanhoLote, 5, { min: 1, max: 50 }),
    intervaloLotesSegundos: parsePositiveInt(settings.intervaloLotesSegundos, 60, { min: 10, max: 3600 }),
  };
};
