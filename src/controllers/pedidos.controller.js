'use strict';

/**
 * @fileoverview Controlador de pedidos — ProvvTecno
 */

const PedidoModel   = require('../models/pedido.model');
const ProductoModel = require('../models/producto.model');

const listarPedidos = (req, res) => {
  const { estado, email } = req.query;
  let resultado = PedidoModel.findAll();

  if (estado) resultado = resultado.filter(p => p.estado === estado.toUpperCase());
  if (email)  resultado = resultado.filter(p => p.cliente.email === email);

  return res.status(200).json({ ok: true, total: resultado.length, data: resultado });
};

const obtenerPedido = (req, res) => {
  const pedido = PedidoModel.findById(req.params.id);
  if (!pedido) {
    return res.status(404).json({
      ok     : false,
      mensaje: `Pedido con id '${req.params.id}' no encontrado en ProvvTecno`
    });
  }
  return res.status(200).json({ ok: true, data: pedido });
};

const crearPedido = (req, res) => {
  const { cliente, productos: items, descuento, metodo_pago, notas } = req.body;
  const errores = [];

  if (!cliente || typeof cliente !== 'object') {
    errores.push('El campo "cliente" es obligatorio (objeto con nombre, email, telefono, direccion)');
  } else {
    if (!cliente.nombre   || String(cliente.nombre).trim().length < 2) errores.push('cliente.nombre es obligatorio');
    if (!cliente.email    || !cliente.email.includes('@'))              errores.push('cliente.email debe ser un correo válido');
    if (!cliente.telefono)                                             errores.push('cliente.telefono es obligatorio');
    if (!cliente.direccion)                                            errores.push('cliente.direccion es obligatorio');
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    errores.push('El campo "productos" debe ser un arreglo no vacío');
  } else {
    items.forEach((item, i) => {
      if (!item.producto_id)                                              errores.push(`productos[${i}].producto_id es obligatorio`);
      if (!item.cantidad || isNaN(item.cantidad) || item.cantidad < 1)   errores.push(`productos[${i}].cantidad debe ser mayor a 0`);
      if (!item.precio_unitario || isNaN(item.precio_unitario))          errores.push(`productos[${i}].precio_unitario es obligatorio`);
      if (item.producto_id && !ProductoModel.findById(item.producto_id)) errores.push(`Producto '${item.producto_id}' no existe en el catálogo ProvvTecno`);
    });
  }

  if (metodo_pago && !['PSE', 'EFECTIVO', 'TARJETA'].includes(metodo_pago.toUpperCase()))
    errores.push('metodo_pago debe ser PSE, EFECTIVO o TARJETA');

  if (errores.length > 0) return res.status(400).json({ ok: false, errores });

  const itemsEnriquecidos = items.map(item => {
    const prod = ProductoModel.findById(item.producto_id);
    return {
      producto_id    : item.producto_id,
      nombre         : prod ? prod.nombre : item.nombre || 'Producto',
      cantidad       : Number(item.cantidad),
      precio_unitario: Number(item.precio_unitario)
    };
  });

  const nuevo = PedidoModel.create({
    cliente,
    productos  : itemsEnriquecidos,
    descuento  : descuento || 0,
    metodo_pago: (metodo_pago || 'PSE').toUpperCase(),
    notas      : notas || ''
  });

  return res.status(201).json({
    ok     : true,
    mensaje: 'Pedido creado exitosamente en ProvvTecno',
    data   : nuevo
  });
};

const actualizarEstadoPedido = (req, res) => {
  const { id }    = req.params;
  const { estado } = req.body;

  if (!estado || !PedidoModel.ESTADOS_VALIDOS.includes(estado.toUpperCase())) {
    return res.status(400).json({
      ok     : false,
      mensaje: `Estado inválido. Valores válidos: ${PedidoModel.ESTADOS_VALIDOS.join(', ')}`
    });
  }

  const actualizado = PedidoModel.updateEstado(id, estado.toUpperCase());
  if (!actualizado) return res.status(404).json({ ok: false, mensaje: `Pedido '${id}' no encontrado` });

  return res.status(200).json({
    ok     : true,
    mensaje: 'Estado del pedido actualizado en ProvvTecno',
    data   : actualizado
  });
};

module.exports = { listarPedidos, obtenerPedido, crearPedido, actualizarEstadoPedido };