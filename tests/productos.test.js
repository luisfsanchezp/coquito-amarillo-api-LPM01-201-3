'use strict';

/**
 * @fileoverview Pruebas unitarias — Controlador de Productos — ProvvTecno
 * Ejecutar: npm test
 */

const request = require('supertest');
const app     = require('../src/app');

const productoValido = {
  nombre    : 'Monitor LED 24 pulgadas ProvvTecno',
  descripcion: 'Monitor Full HD IPS 75Hz, sin parpadeo, bajo brillo azul.',
  precio    : 450000,
  stock     : 20,
  categoria : 'tecnologia',
  imagen_url: 'https://provvtecno.com/img/monitor-24.jpg'
};

describe('GET /api/productos', () => {
  test('debe retornar 200 y un arreglo de productos', async () => {
    const res = await request(app).get('/api/productos');
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(typeof res.body.total).toBe('number');
  });

  test('debe filtrar por categoria=accesorios', async () => {
    const res = await request(app).get('/api/productos?categoria=accesorios');
    expect(res.statusCode).toBe(200);
    res.body.data.forEach(p => expect(p.categoria).toBe('accesorios'));
  });

  test('debe filtrar por min_precio=100000', async () => {
    const res = await request(app).get('/api/productos?min_precio=100000');
    expect(res.statusCode).toBe(200);
    res.body.data.forEach(p => expect(p.precio).toBeGreaterThanOrEqual(100000));
  });
});

describe('GET /api/productos/:id', () => {
  test('debe retornar 200 cuando el id existe', async () => {
    const res = await request(app).get('/api/productos/prod-001');
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.data.id).toBe('prod-001');
  });

  test('debe retornar 404 cuando el id no existe', async () => {
    const res = await request(app).get('/api/productos/id-inexistente');
    expect(res.statusCode).toBe(404);
    expect(res.body.ok).toBe(false);
    expect(res.body.mensaje).toMatch(/no encontrado/i);
  });
});

describe('POST /api/productos', () => {
  test('debe crear un producto y retornar 201', async () => {
    const res = await request(app).post('/api/productos').send(productoValido);
    expect(res.statusCode).toBe(201);
    expect(res.body.ok).toBe(true);
    expect(res.body.data.nombre).toBe(productoValido.nombre);
    expect(res.body.data.id).toBeDefined();
  });

  test('debe retornar 400 si falta el nombre', async () => {
    const { nombre, ...sinNombre } = productoValido;
    const res = await request(app).post('/api/productos').send(sinNombre);
    expect(res.statusCode).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.errores).toBeDefined();
  });

  test('debe retornar 400 si el precio es negativo', async () => {
    const res = await request(app).post('/api/productos').send({ ...productoValido, precio: -500 });
    expect(res.statusCode).toBe(400);
    expect(res.body.ok).toBe(false);
  });

  test('debe retornar 400 si la categoría es inválida', async () => {
    const res = await request(app).post('/api/productos').send({ ...productoValido, categoria: 'ropa' });
    expect(res.statusCode).toBe(400);
    expect(res.body.errores[0]).toMatch(/categoria/i);
  });
});

describe('PUT /api/productos/:id', () => {
  test('debe actualizar un producto y retornar 200', async () => {
    const res = await request(app).put('/api/productos/prod-001').send({ precio: 50000, stock: 100 });
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.data.precio).toBe(50000);
    expect(res.body.data.stock).toBe(100);
  });

  test('debe retornar 404 al actualizar id inexistente', async () => {
    const res = await request(app).put('/api/productos/no-existe').send({ precio: 1000 });
    expect(res.statusCode).toBe(404);
    expect(res.body.ok).toBe(false);
  });
});

describe('DELETE /api/productos/:id', () => {
  test('debe eliminar un producto y retornar 204', async () => {
    const crear = await request(app).post('/api/productos').send({ ...productoValido, nombre: 'Producto Temporal ProvvTecno' });
    const id    = crear.body.data.id;
    const del   = await request(app).delete(`/api/productos/${id}`);
    expect(del.statusCode).toBe(204);
    const verify = await request(app).get(`/api/productos/${id}`);
    expect(verify.statusCode).toBe(404);
  });

  test('debe retornar 404 al eliminar id inexistente', async () => {
    const res = await request(app).delete('/api/productos/fantasma-99');
    expect(res.statusCode).toBe(404);
    expect(res.body.ok).toBe(false);
  });
});

describe('GET /', () => {
  test('debe retornar información de la API ProvvTecno', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.empresa).toBe('ProvvTecno');
    expect(res.body.endpoints).toBeDefined();
  });
});