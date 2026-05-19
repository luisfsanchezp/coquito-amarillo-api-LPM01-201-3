'use strict';

/**
 * @fileoverview Módulo simulado de pasarela de pago PSE — ACH Colombia.
 * ProvvTecno — AVISO: módulo SIMULADO con fines académicos.
 */

const crypto = require('crypto');

let transacciones = [
  {
    referencia      : 'TXN-20260421-001',
    banco_codigo    : '1007',
    banco_nombre    : 'Bancolombia',
    tipo_persona    : 'N',
    tipo_documento  : 'CC',
    numero_documento: cifrarDocumento('1098765432'),
    monto           : 210000,
    moneda          : 'COP',
    descripcion     : 'Compra tienda ProvvTecno - Pedido #PV-2026-0001',
    url_respuesta   : 'https://provvtecno.com/pagos/respuesta',
    url_confirmacion: 'https://provvtecno.com/pagos/confirmacion',
    estado          : 'APROBADO',
    codigo_respuesta: '00',
    mensaje_banco   : 'Transacción aprobada',
    ip_origen       : '181.52.100.1',
    fecha_creacion  : new Date('2026-04-21T10:30:00').toISOString(),
    fecha_respuesta : new Date('2026-04-21T10:30:45').toISOString()
  }
];

const BANCOS_ACH = {
  '1007': 'Bancolombia',
  '1006': 'Banco de Bogotá',
  '1009': 'Citibank',
  '1013': 'BBVA Colombia',
  '1014': 'Helm Bank',
  '1023': 'Banco de Occidente',
  '1032': 'Banco Caja Social',
  '1040': 'Banco Agrario',
  '1051': 'Davivienda',
  '1052': 'Banco AV Villas',
  '1059': 'Bancamía',
  '1060': 'Bancoomeva',
  '1061': 'Banco Finandina',
  '1062': 'Banco Falabella',
  '1063': 'Banco Pichincha',
  '1291': 'Scotiabank Colpatria',
  '1507': 'Nequi',
  '1551': 'Daviplata'
};

const TIPOS_DOCUMENTO_VALIDOS = ['CC', 'CE', 'NIT', 'TI', 'PP'];
const TIPOS_PERSONA_VALIDOS   = ['N', 'J'];

function cifrarDocumento(documento) {
  const hash = crypto.createHash('sha256').update(String(documento)).digest('hex');
  return `SHA256:${hash.slice(0, 24)}...`;
}

function generarReferencia() {
  const fecha    = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const aleatorio = Math.floor(Math.random() * 9000 + 1000);
  return `TXN-${fecha}-${aleatorio}`;
}

function simularRespuestaBanco(monto) {
  const r = Math.random();
  if (monto > 10000000) {
    return { estado: 'RECHAZADO', codigo: '51', mensaje: 'Monto excede límite PSE diario' };
  }
  if (r < 0.80) return { estado: 'APROBADO',  codigo: '00', mensaje: 'Transacción aprobada' };
  if (r < 0.95) return { estado: 'PENDIENTE', codigo: '09', mensaje: 'Transacción en proceso de autorización' };
  return { estado: 'RECHAZADO', codigo: '05', mensaje: 'Transacción no autorizada por el banco' };
}

const PagoPseModel = {
  findAll() {
    return [...transacciones];
  },

  findByReferencia(ref) {
    return transacciones.find(t => t.referencia === ref) || null;
  },

  create({ banco_codigo, tipo_persona, tipo_documento, numero_documento, monto, descripcion, url_respuesta, url_confirmacion = '', ip_origen = '127.0.0.1' }) {
    const respuesta  = simularRespuestaBanco(monto);
    const referencia = generarReferencia();
    const nueva = {
      referencia,
      banco_codigo,
      banco_nombre    : BANCOS_ACH[banco_codigo] || 'Banco desconocido',
      tipo_persona,
      tipo_documento,
      numero_documento: cifrarDocumento(numero_documento),
      monto           : Number(monto),
      moneda          : 'COP',
      descripcion,
      url_respuesta,
      url_confirmacion,
      estado          : respuesta.estado,
      codigo_respuesta: respuesta.codigo,
      mensaje_banco   : respuesta.mensaje,
      ip_origen,
      fecha_creacion  : new Date().toISOString(),
      fecha_respuesta : respuesta.estado !== 'PENDIENTE' ? new Date().toISOString() : null
    };
    transacciones.push(nueva);
    return nueva;
  },

  _reset(data = []) { transacciones = [...data]; },
  BANCOS_ACH,
  TIPOS_DOCUMENTO_VALIDOS,
  TIPOS_PERSONA_VALIDOS,
  cifrarDocumento
};

module.exports = PagoPseModel;