'use strict';

const { Router } = require('express');
const { listarPedidos, obtenerPedido, crearPedido, actualizarEstadoPedido } = require('../controllers/pedidos.controller');

const router = Router();

router.get('/',             listarPedidos);         // GET   /api/pedidos
router.get('/:id',          obtenerPedido);          // GET   /api/pedidos/:id
router.post('/',            crearPedido);             // POST  /api/pedidos
router.patch('/:id/estado', actualizarEstadoPedido); // PATCH /api/pedidos/:id/estado

module.exports = router;