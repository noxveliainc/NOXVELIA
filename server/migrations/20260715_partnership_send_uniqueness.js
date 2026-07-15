import PartnershipEmailSend from '../models/PartnershipEmailSend.js';

export const name = '20260715_partnership_send_uniqueness';

export const up = async () => {
  await PartnershipEmailSend.syncIndexes();
};
