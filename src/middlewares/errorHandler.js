'use strict';

const notFound = (req, res, _next) => {
  res.status(404).json({
    ok        : false,
    mensaje   : `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
    sugerencia: 'Consulta la documentación en GET /'
  });
};

const errorHandler = (err, _req, res, _next) => {
  console.error('[ProvvTecno ERROR]', err.message);
  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json({
    ok     : false,
    mensaje: statusCode === 500 ? 'Error interno del servidor — ProvvTecno' : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = { notFound, errorHandler };