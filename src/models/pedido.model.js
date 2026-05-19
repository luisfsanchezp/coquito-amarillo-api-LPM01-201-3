'use strict';

/**
 * @fileoverview Modelo de datos en memoria para pedidos.
 * ProvvTecno — Estados: PENDIENTE → CONFIRMADO → ENVIADO → ENTREGADO | CANCELADO
 */

const { v4: uuidv4 } = require('uuid');

let pedidos = [
  {
    id            : 'ped-001',
    numero_pedido : 'PV-2026-0001',
    cliente       : {
      nombre   : 'Laura Milena Gómez',
      email    : 'lgomez@email.com',
      telefono : '3001234567',
      direccion: 'Cra 43A # 18-11, El Poblado, Medellín'
    },
    productos: [
      { producto_id: 'prod-001', nombre: 'Mouse Inalámbrico ProvvTecno Pro', cantidad: 2, precio_unitario: 45000 },
      { producto_id: 'prod-003', nombre: 'Cámara Web Full HD 1080p',         cantidad: 1, precio_unitario: 120000 }
    ],
    subtotal       : 210000,
    descuento      : 0,
    total          : 210000,
    estado         : 'CONFIRMADO',
    metodo_pago    : 'PSE',
    referencia_pago: 'TXN-20260421-001',
    notas          : 'Entregar en horario de oficina',
    createdAt      : new Date('2026-04-21').toISOString(),
    updatedAt      : new Date('2026-04-21').toISOString()
  }
];

let contadorPedidos = 2;

const ESTADOS_VALIDOS = ['PENDIENTE', 'CONFIRMADO', 'ENVIADO', 'ENTREGADO', 'CANCELADO'];

const PedidoModel = {
  findAll() {
    return [...pedidos];
  },

  findById(id) {
    return pedidos.find(p => p.id === id) || null;
  },

  create({ cliente, productos: items, descuento = 0, metodo_pago = 'PSE', notas = '' }) {
    const subtotal = items.reduce(
      (acc, item) => acc + (item.precio_unitario * item.cantidad), 0
    );
    const total        = subtotal - descuento;
    const numeroPedido = `PV-${new Date().getFullYear()}-${String(contadorPedidos).padStart(4, '0')}`;
    contadorPedidos++;

    const nuevo = {
      id            : uuidv4(),
      numero_pedido : numeroPedido,
      cliente,
      productos     : items,
      subtotal,
      descuento,
      total,
      estado        : 'PENDIENTE',
      metodo_pago,
      referencia_pago: null,
      notas,
      createdAt     : new Date().toISOString(),
      updatedAt     : new Date().toISOString()
    };
    pedidos.push(nuevo);
    return nuevo;
  },

  updateEstado(id, estado) {
    const idx = pedidos.findIndex(p => p.id === id);
    if (idx === -1) return null;
    pedidos[idx] = { ...pedidos[idx], estado, updatedAt: new Date().toISOString() };
    return pedidos[idx];
  },

  linkPago(id, referencia_pago) {
    const idx = pedidos.findIndex(p => p.id === id);
    if (idx === -1) return null;
    pedidos[idx] = { ...pedidos[idx], referencia_pago, updatedAt: new Date().toISOString() };
    return pedidos[idx];
  },

  _reset(data = []) { pedidos = [...data]; contadorPedidos = 1; },
  ESTADOS_VALIDOS
};

module.exports = PedidoModel;