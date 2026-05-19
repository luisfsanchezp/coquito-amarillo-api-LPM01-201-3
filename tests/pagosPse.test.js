'use strict';

/**
 * @fileoverview Pruebas unitarias — Pasarela PSE — ProvvTecno
 */

const request = require('supertest');
const app     = require('../src/app');

const transaccionValida = {
  banco_codigo    : '1007',
  tipo_persona    : 'N',
  tipo_documento  : 'CC',
  numero_documento: '1098765432',
  monto           : 210000,
  descripcion     : 'Compra tienda ProvvTecno - Pedido #PV-2026-0002',
  url_respuesta   : 'https://provvtecno.com/pagos/respuesta'
};

describe('GET /api/pagos-pse/bancos', () => {
  test('debe retornar lista de bancos ACH Colombia', async () => {
    const res = await request(app).get('/api/pagos-pse/bancos');
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0]).toHaveProperty('codigo');
    expect(res.body.data[0]).toHaveProperty('nombre');
  });
});

describe('POST /api/pagos-pse', () => {
  test('debe retornar 200 o 402 con referencia válida', async () => {
    const res = await request(app).post('/api/pagos-pse').send(transaccionValida);
    expect([200, 402]).toContain(res.statusCode);
    expect(res.body.data.referencia).toMatch(/^TXN-/);
    expect(['APROBADO', 'PENDIENTE', 'RECHAZADO']).toContain(res.body.data.estado);
    expect(res.body.data.numero_documento).toMatch(/^SHA256:/);
  });

  test('debe retornar 400 si falta banco_codigo', async () => {
    const { banco_codigo, ...payload } = transaccionValida;
    const res = await request(app).post('/api/pagos-pse').send(payload);
    expect(res.statusCode).toBe(400);
    expect(res.body.errores).toBeDefined();
  });

  test('debe retornar 400 si el monto es menor a 1000', async () => {
    const res = await request(app).post('/api/pagos-pse').send({ ...transaccionValida, monto: 500 });
    expect(res.statusCode).toBe(400);
  });

  test('debe retornar 400 si tipo_persona es inválido', async () => {
    const res = await request(app).post('/api/pagos-pse').send({ ...transaccionValida, tipo_persona: 'X' });
    expect(res.statusCode).toBe(400);
  });
});

describe('GET /api/pagos-pse/:ref', () => {
  test('debe consultar transacción existente TXN-20260421-001', async () => {
    const res = await request(app).get('/api/pagos-pse/TXN-20260421-001');
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.data.referencia).toBe('TXN-20260421-001');
  });

  test('debe retornar 404 para referencia inexistente', async () => {
    const res = await request(app).get('/api/pagos-pse/TXN-0000-FAKE');
    expect(res.statusCode).toBe(404);
    expect(res.body.ok).toBe(false);
  });
});