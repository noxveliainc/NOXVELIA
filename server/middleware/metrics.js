const startedAt = Date.now();
const counters = new Map();

export const requestMetrics = (req, res, next) => {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const route = req.route?.path || req.path.replace(/[a-f\d]{24}/gi, ':id');
    const key = `${req.method} ${route}`;
    const current = counters.get(key) || { requests: 0, errors: 0, totalDurationMs: 0 };
    current.requests += 1;
    if (res.statusCode >= 500) current.errors += 1;
    current.totalDurationMs += Number(process.hrtime.bigint() - start) / 1e6;
    counters.set(key, current);
  });
  next();
};

export const metricsSnapshot = () => ({
  uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
  memory: process.memoryUsage(),
  routes: [...counters.entries()].map(([route, data]) => ({
    route,
    requests: data.requests,
    errors: data.errors,
    averageDurationMs: Number((data.totalDurationMs / data.requests).toFixed(2)),
  })),
});

