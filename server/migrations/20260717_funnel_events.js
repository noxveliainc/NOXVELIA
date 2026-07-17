import FunnelEvent from '../models/FunnelEvent.js';

export const name = '20260717_funnel_events';

export const up = async () => {
  await FunnelEvent.syncIndexes();
};
