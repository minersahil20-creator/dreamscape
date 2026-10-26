const app = require('../server');

const apiRoutes = new Set([
  'health',
  'config',
  'quotes',
  'quotes/search',
  'chat',
]);

module.exports = (req, res) => {
  const requestUrl = new URL(req.url, 'http://localhost');
  const route = requestUrl.searchParams.get('route');

  if (!route || !apiRoutes.has(route)) {
    return res.status(404).json({ error: 'API route not found.' });
  }

  requestUrl.searchParams.delete('route');
  req.url = `/api/${route}${requestUrl.search}`;
  return app(req, res);
};
