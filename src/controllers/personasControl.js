const personas = require('../models/personas');

// ===============================
// OBTENER TODAS LAS PERSONAS
// ===============================

const obtenerPersonas = (req, res) => {

  const personasOcultas = personas.map(persona => ({

    ...persona,

    numDoc: '****' + persona.numDoc.slice(-4)

  }));

  res.json(personasOcultas);

};

// ===============================
// OBTENER PERSONA POR ID
// ===============================

const obtenerPersonaPorId = (req, res) => {

  const persona = personas.find(p => p.id === req.params.id);

  if (!persona) {

    return res.status(404).json({

      mensaje: 'Persona no encontrada'

    });

  }

  res.json(persona);

};

// ===============================
// CREAR PERSONA
// ===============================

const crearPersona = (req, res) => {

  const {

    id,
    tipoDoc,
    numDoc,
    nombres,
    apellidos,
    email,
    telefono,
    ciudad

  } = req.body;

  const emailExiste = personas.find(p => p.email === email);

  if (emailExiste) {

    return res.status(409).json({

      mensaje: 'El email ya existe'

    });

  }

  const documentoExiste = personas.find(p => p.numDoc === numDoc);

  if (documentoExiste) {

    return res.status(409).json({

      mensaje: 'El documento ya existe'

    });

  }

  const nuevaPersona = {

    id,
    tipoDoc,
    numDoc,
    nombres,
    apellidos,
    email,
    telefono,
    ciudad,
    activo: true

  };

  personas.push(nuevaPersona);

  res.status(201).json(nuevaPersona);

};

// ===============================
// ACTUALIZAR PERSONA
// ===============================

const actualizarPersona = (req, res) => {

  const persona = personas.find(p => p.id === req.params.id);

  if (!persona) {

    return res.status(404).json({

      mensaje: 'Persona no encontrada'

    });

  }

  Object.assign(persona, req.body);

  res.json(persona);

};

// ===============================
// ELIMINAR PERSONA
// ===============================

const eliminarPersona = (req, res) => {

  const index = personas.findIndex(p => p.id === req.params.id);

  if (index === -1) {

    return res.status(404).json({

      mensaje: 'Persona no encontrada'

    });

  }

  personas.splice(index, 1);

  res.json({

    mensaje: 'Persona eliminada correctamente'

  });

};

module.exports = {

  obtenerPersonas,
  obtenerPersonaPorId,
  crearPersona,
  actualizarPersona,
  eliminarPersona

};