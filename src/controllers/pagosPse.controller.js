'use strict';

/**
 * @fileoverview Controlador pasarela PSE simulada — ACH Colombia — ProvvTecno
 */

const PagoPseModel = require('../models/pagoPse.model');

const iniciarTransaccion = (req, res) => {
  const { banco_codigo, tipo_persona, tipo_documento, numero_documento, monto, descripcion, url_respuesta, url_confirmacion } = req.body;
  const errores = [];

  if (!banco_codigo) {
    errores.push('El campo "banco_codigo" es obligatorio');
  } else if (!PagoPseModel.BANCOS_ACH[banco_codigo]) {
    errores.push(`Banco '${banco_codigo}' no habilitado para PSE. Consulte GET /api/pagos-pse/bancos`);
  }

  if (!tipo_persona || !PagoPseModel.TIPOS_PERSONA_VALIDOS.includes(tipo_persona))
    errores.push('"tipo_persona" es obligatorio: N (Natural) o J (Jurídica)');

  if (!tipo_documento || !PagoPseModel.TIPOS_DOCUMENTO_VALIDOS.includes(tipo_documento))
    errores.push(`"tipo_documento" inválido. Válidos: ${PagoPseModel.TIPOS_DOCUMENTO_VALIDOS.join(', ')}`);

  if (!numero_documento || String(numero_documento).trim().length < 5)
    errores.push('"numero_documento" es obligatorio y debe tener al menos 5 caracteres');

  if (monto === undefined || isNaN(monto))
    errores.push('"monto" es obligatorio y debe ser numérico');
  else if (Number(monto) < 1000)
    errores.push('"monto" debe ser igual o mayor a $1.000 COP');
  else if (Number(monto) > 10000000)
    errores.push('"monto" no puede superar $10.000.000 COP (límite PSE diario)');

  if (!descripcion || String(descripcion).trim().length < 5)
    errores.push('"descripcion" es obligatoria y debe tener al menos 5 caracteres');

  if (!url_respuesta) {
    errores.push('"url_respuesta" es obligatoria');
  } else {
    try { new URL(url_respuesta); }
    catch { errores.push('"url_respuesta" debe ser una URL válida'); }
  }

  if (errores.length > 0) return res.status(400).json({ ok: false, errores });

  const ip_origen   = req.ip || '127.0.0.1';
  const transaccion = PagoPseModel.create({
    banco_codigo, tipo_persona, tipo_documento, numero_documento,
    monto: Number(monto),
    descripcion: String(descripcion).trim(),
    url_respuesta,
    url_confirmacion: url_confirmacion || '',
    ip_origen
  });

  const httpStatus = transaccion.estado === 'RECHAZADO' ? 402 : 200;

  return res.status(httpStatus).json({
    ok     : transaccion.estado !== 'RECHAZADO',
    mensaje: transaccion.estado === 'APROBADO'
      ? 'Transacción PSE aprobada exitosamente — ProvvTecno'
      : transaccion.estado === 'PENDIENTE'
        ? 'Transacción PSE en proceso. Consulte el estado con la referencia.'
        : 'Transacción PSE rechazada por el banco',
    data: {
      referencia      : transaccion.referencia,
      estado          : transaccion.estado,
      banco_nombre    : transaccion.banco_nombre,
      monto           : transaccion.monto,
      moneda          : transaccion.moneda,
      codigo_respuesta: transaccion.codigo_respuesta,
      mensaje_banco   : transaccion.mensaje_banco,
      fecha_creacion  : transaccion.fecha_creacion,
      url_respuesta   : transaccion.url_respuesta,
      numero_documento: transaccion.numero_documento
    }
  });
};

const consultarTransaccion = (req, res) => {
  const transaccion = PagoPseModel.findByReferencia(req.params.ref);
  if (!transaccion) {
    return res.status(404).json({
      ok     : false,
      mensaje: `Transacción PSE '${req.params.ref}' no encontrada en ProvvTecno`
    });
  }
  return res.status(200).json({
    ok  : true,
    data: {
      referencia      : transaccion.referencia,
      estado          : transaccion.estado,
      banco_nombre    : transaccion.banco_nombre,
      monto           : transaccion.monto,
      moneda          : transaccion.moneda,
      descripcion     : transaccion.descripcion,
      codigo_respuesta: transaccion.codigo_respuesta,
      mensaje_banco   : transaccion.mensaje_banco,
      fecha_creacion  : transaccion.fecha_creacion,
      fecha_respuesta : transaccion.fecha_respuesta,
      tipo_persona    : transaccion.tipo_persona,
      tipo_documento  : transaccion.tipo_documento,
      numero_documento: transaccion.numero_documento
    }
  });
};

const listarBancos = (_req, res) => {
  const bancos = Object.entries(PagoPseModel.BANCOS_ACH).map(([codigo, nombre]) => ({ codigo, nombre }));
  return res.status(200).json({ ok: true, total: bancos.length, data: bancos });
};

module.exports = { iniciarTransaccion, consultarTransaccion, listarBancos };