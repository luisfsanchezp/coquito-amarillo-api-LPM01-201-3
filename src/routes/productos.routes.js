'use strict';

const { Router } = require('express');
const { listarProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos.controller');

const router = Router();

router.get('/',    listarProductos);  // GET  /api/productos
router.get('/:id', obtenerProducto); // GET  /api/productos/:id
router.post('/',   crearProducto);   // POST /api/productos
router.put('/:id', actualizarProducto); // PUT /api/productos/:id
router.delete('/:id', eliminarProducto); // DELETE /api/productos/:id

module.exports = router;