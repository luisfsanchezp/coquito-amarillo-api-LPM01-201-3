const express = require('express');

const router = express.Router();

const {

  obtenerPersonas,
  obtenerPersonaPorId,
  crearPersona,
  actualizarPersona,
  eliminarPersona

} = require('../controllers/personasControl.js');

// ===============================
// RUTAS
// ===============================

// Obtener todas
router.get('/', obtenerPersonas);

// Obtener por ID
router.get('/:id', obtenerPersonaPorId);

// Crear
router.post('/', crearPersona);

// Actualizar
router.put('/:id', actualizarPersona);

// Eliminar
router.delete('/:id', eliminarPersona);

module.exports = router;