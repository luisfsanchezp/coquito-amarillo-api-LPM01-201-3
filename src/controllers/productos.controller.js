'use strict';

/**
 * @fileoverview Controlador de productos — ProvvTecno
 * Implementa la lógica CRUD para el catálogo de productos tecnológicos.
 */

const ProductoModel = require('../models/producto.model');

// ─── GET /api/productos ────────────────────────────────────────────────────────
const listarProductos = (req, res) => {
  const { categoria, activo, min_precio, max_precio } = req.query;
  let resultado = ProductoModel.findAll();

  if (categoria)    resultado = resultado.filter(p => p.categoria === categoria.toLowerCase());
  if (activo !== undefined) resultado = resultado.filter(p => p.activo === (activo === 'true'));
  if (min_precio)   resultado = resultado.filter(p => p.precio >= Number(min_precio));
  if (max_precio)   resultado = resultado.filter(p => p.precio <= Number(max_precio));

  return res.status(200).json({ ok: true, total: resultado.length, data: resultado });
};

// ─── GET /api/productos/:id ────────────────────────────────────────────────────
const obtenerProducto = (req, res) => {
  const producto = ProductoModel.findById(req.params.id);
  if (!producto) {
    return res.status(404).json({
      ok     : false,
      mensaje: `Producto con id '${req.params.id}' no encontrado en ProvvTecno`
    });
  }
  return res.status(200).json({ ok: true, data: producto });
};

// ─── POST /api/productos ───────────────────────────────────────────────────────
const crearProducto = (req, res) => {
  const { nombre, descripcion, precio, stock, categoria, imagen_url } = req.body;
  const errores = [];

  if (!nombre || String(nombre).trim().length < 3)
    errores.push('El campo "nombre" es obligatorio y debe tener al menos 3 caracteres');
  if (precio === undefined || isNaN(precio) || Number(precio) < 0)
    errores.push('El campo "precio" es obligatorio y debe ser un número no negativo');
  if (!categoria || !ProductoModel.CATEGORIAS_VALIDAS.includes(categoria))
    errores.push(`El campo "categoria" es obligatorio. Valores válidos: ${ProductoModel.CATEGORIAS_VALIDAS.join(', ')}`);
  if (stock !== undefined && (isNaN(stock) || Number(stock) < 0))
    errores.push('El campo "stock" debe ser un número entero no negativo');

  if (errores.length > 0) return res.status(400).json({ ok: false, errores });

  const nuevo = ProductoModel.create({
    nombre: String(nombre).trim(),
    descripcion,
    precio,
    stock,
    categoria,
    imagen_url
  });

  return res.status(201).json({
    ok     : true,
    mensaje: 'Producto creado exitosamente en ProvvTecno',
    data   : nuevo
  });
};

// ─── PUT /api/productos/:id ────────────────────────────────────────────────────
const actualizarProducto = (req, res) => {
  const { id } = req.params;
  if (!ProductoModel.findById(id)) {
    return res.status(404).json({
      ok     : false,
      mensaje: `Producto con id '${id}' no encontrado en ProvvTecno`
    });
  }

  const { nombre, descripcion, precio, stock, categoria, imagen_url, activo } = req.body;
  const errores = [];

  if (nombre    !== undefined && String(nombre).trim().length < 3)
    errores.push('El campo "nombre" debe tener al menos 3 caracteres');
  if (precio    !== undefined && (isNaN(precio) || Number(precio) < 0))
    errores.push('El campo "precio" debe ser un número no negativo');
  if (categoria !== undefined && !ProductoModel.CATEGORIAS_VALIDAS.includes(categoria))
    errores.push(`Categoría inválida. Valores válidos: ${ProductoModel.CATEGORIAS_VALIDAS.join(', ')}`);
  if (stock     !== undefined && (isNaN(stock) || Number(stock) < 0))
    errores.push('El campo "stock" debe ser un número entero no negativo');

  if (errores.length > 0) return res.status(400).json({ ok: false, errores });

  const campos = {};
  if (nombre      !== undefined) campos.nombre      = String(nombre).trim();
  if (descripcion !== undefined) campos.descripcion = descripcion;
  if (precio      !== undefined) campos.precio      = Number(precio);
  if (stock       !== undefined) campos.stock       = Number(stock);
  if (categoria   !== undefined) campos.categoria   = categoria;
  if (imagen_url  !== undefined) campos.imagen_url  = imagen_url;
  if (activo      !== undefined) campos.activo      = Boolean(activo);

  const actualizado = ProductoModel.update(id, campos);
  return res.status(200).json({
    ok     : true,
    mensaje: 'Producto actualizado exitosamente en ProvvTecno',
    data   : actualizado
  });
};

// ─── DELETE /api/productos/:id ─────────────────────────────────────────────────
const eliminarProducto = (req, res) => {
  const { id } = req.params;
  if (!ProductoModel.findById(id)) {
    return res.status(404).json({
      ok     : false,
      mensaje: `Producto con id '${id}' no encontrado en ProvvTecno`
    });
  }
  ProductoModel.delete(id);
  return res.status(204).send();
};

module.exports = { listarProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto };