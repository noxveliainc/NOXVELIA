import ImageAsset from '../models/ImageAsset.js';

export const name = '20260714_image_assets';

export const up = async () => {
  await ImageAsset.syncIndexes();
};
