export const parsePagination = (query = {}, defaults = {}) => {
  const defaultLimit = defaults.limit || 12;
  const maxLimit = defaults.maxLimit || 50;
  const rawPage = Number.parseInt(query.page, 10);
  const rawLimit = Number.parseInt(query.limit, 10);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const limit = Math.min(Number.isFinite(rawLimit) && rawLimit > 0 ? rawLimit : defaultLimit, maxLimit);
  return { page, limit, skip: (page - 1) * limit };
};

