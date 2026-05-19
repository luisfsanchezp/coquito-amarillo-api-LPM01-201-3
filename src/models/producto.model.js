'use strict';

/**
 * @fileoverview Modelo de datos en memoria para el catálogo de productos.
 * ProvvTecno — Categorías: tecnologia, accesorios, software.
 */

const { v4: uuidv4 } = require('uuid');

let productos = [
  {
    id         : 'prod-001',
    nombre     : 'Mouse Inalámbrico ProvvTecno Pro',
    descripcion: 'Mouse ergonómico inalámbrico 2.4GHz, 1600 DPI, batería recargable.',
    precio     : 45000,
    stock      : 80,
    categoria  : 'accesorios',
    imagen_url : 'https://provvtecno.com/img/mouse-pro.jpg',
    activo     : true,
    createdAt  : new Date('2024-01-10').toISOString(),
    updatedAt  : new Date('2024-01-10').toISOString()
  },
  {
    id         : 'prod-002',
    nombre     : 'Teclado Mecánico RGB 65%',
    descripcion: 'Teclado mecánico compacto con switches blue, retroiluminación RGB personalizable.',
    precio     : 185000,
    stock      : 35,
    categoria  : 'accesorios',
    imagen_url : 'https://provvtecno.com/img/teclado-rgb.jpg',
    activo     : true,
    createdAt  : new Date('2024-01-10').toISOString(),
    updatedAt  : new Date('2024-01-10').toISOString()
  },
  {
    id         : 'prod-003',
    nombre     : 'Cámara Web Full HD 1080p',
    descripcion: 'Cámara web con micrófono integrado, compatible con Zoom, Teams y Meet.',
    precio     : 120000,
    stock      : 50,
    categoria  : 'tecnologia',
    imagen_url : 'https://provvtecno.com/img/camara-web.jpg',
    activo     : true,
    createdAt  : new Date('2024-02-01').toISOString(),
    updatedAt  : new Date('2024-02-01').toISOString()
  },
  {
    id         : 'prod-004',
    nombre     : 'Hub USB-C 7 en 1',
    descripcion: 'Adaptador multipuerto USB-C con HDMI 4K, USB 3.0, SD card y carga rápida 100W.',
    precio     : 98000,
    stock      : 60,
    categoria  : 'accesorios',
    imagen_url : 'https://provvtecno.com/img/hub-usbc.jpg',
    activo     : true,
    createdAt  : new Date('2024-03-15').toISOString(),
    updatedAt  : new Date('2024-03-15').toISOString()
  },
  {
    id         : 'prod-005',
    nombre     : 'Licencia Antivirus ProvvShield 1 año',
    descripcion: 'Protección total para 3 dispositivos. Incluye VPN y gestor de contraseñas.',
    precio     : 75000,
    stock      : 200,
    categoria  : 'software',
    imagen_url : 'https://provvtecno.com/img/antivirus.jpg',
    activo     : true,
    createdAt  : new Date('2024-04-01').toISOString(),
    updatedAt  : new Date('2024-04-01').toISOString()
  }
];

const CATEGORIAS_VALIDAS = ['tecnologia', 'accesorios', 'software'];

const ProductoModel = {
  findAll() {
    return [...productos];
  },

  findById(id) {
    return productos.find(p => p.id === id) || null;
  },

  create({ nombre, descripcion = '', precio, stock = 0, categoria, imagen_url = '' }) {
    const nuevo = {
      id         : uuidv4(),
      nombre,
      descripcion,
      precio     : Number(precio),
      stock      : Number(stock),
      categoria,
      imagen_url,
      activo     : true,
      createdAt  : new Date().toISOString(),
      updatedAt  : new Date().toISOString()
    };
    productos.push(nuevo);
    return nuevo;
  },

  update(id, campos) {
    const idx = productos.findIndex(p => p.id === id);
    if (idx === -1) return null;
    productos[idx] = {
      ...productos[idx],
      ...campos,
      id       : productos[idx].id,
      updatedAt: new Date().toISOString()
    };
    return productos[idx];
  },

  delete(id) {
    const idx = productos.findIndex(p => p.id === id);
    if (idx === -1) return false;
    productos.splice(idx, 1);
    return true;
  },

  _reset(data = []) { productos = [...data]; },
  _getAll()         { return productos; },
  CATEGORIAS_VALIDAS
};

module.exports = ProductoModel;