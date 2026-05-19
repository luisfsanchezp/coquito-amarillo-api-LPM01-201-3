'use strict';

const { Router } = require('express');
const { iniciarTransaccion, consultarTransaccion, listarBancos } = require('../controllers/pagosPse.controller');

const router = Router();

router.get('/bancos', listarBancos);          // GET  /api/pagos-pse/bancos
router.post('/',      iniciarTransaccion);    // POST /api/pagos-pse
router.get('/:ref',   consultarTransaccion);  // GET  /api/pagos-pse/:ref

module.exports = router;