'use strict';

const requestLogger = (req, res, next) => {
  const inicio    = Date.now();
  const timestamp = new Date().toISOString();

  res.on('finish', () => {
    const duracion = Date.now() - inicio;
    const color = res.statusCode >= 500 ? '\x1b[31m'
                : res.statusCode >= 400 ? '\x1b[33m'
                : res.statusCode >= 200 ? '\x1b[32m'
                : '\x1b[36m';
    const reset = '\x1b[0m';
    console.log(`${color}[ProvvTecno][${timestamp}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duracion}ms)${reset}`);
  });

  next();
};

module.exports = requestLogger;