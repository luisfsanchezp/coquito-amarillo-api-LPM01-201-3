'use strict';

require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const productosRouter = require('./routes/productos.routes');
const pedidosRouter   = require('./routes/pedidos.routes');
const pagosPseRouter  = require('./routes/pagosPse.routes');
const { errorHandler, notFound } = require('./middlewares/errorHandler');
const requestLogger = require('./middlewares/requestLogger');

const app  = express();
const PORT = process.env.PORT || 4000;

// ─── Middlewares globales ─────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// ─── Ruta raíz ────────────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({
    empresa  : 'ProvvTecno',
    api      : 'Tienda Virtual REST API',
    version  : 'v1.0.0',
    estado   : 'activa',
    endpoints: {
      productos: '/api/productos',
      pedidos  : '/api/pedidos',
      pagosPse : '/api/pagos-pse'
    }
  });
});

// ─── Rutas de la API ──────────────────────────────────────────────────────────
app.use('/api/productos', productosRouter);
app.use('/api/pedidos',   pedidosRouter);
app.use('/api/pagos-pse', pagosPseRouter);

// ─── Manejo de errores ────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Iniciar servidor ─────────────────────────────────────────────────────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  💻  ProvvTecno — API REST iniciada');
    console.log(`  🚀  Servidor corriendo en http://localhost:${PORT}`);
    console.log(`  📋  Documentación: http://localhost:${PORT}/`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  });
}

module.exports = app;