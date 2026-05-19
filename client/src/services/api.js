import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

// ── Productos ──────────────────────────────────────────────────────────────────
export const getProductos    = (params) => api.get('/productos', { params });
export const getProductoById = (id)     => api.get(`/productos/${id}`);
export const crearProducto   = (data)   => api.post('/productos', data);
export const actualizarProducto = (id, data) => api.put(`/productos/${id}`, data);
export const eliminarProducto   = (id)       => api.delete(`/productos/${id}`);

// ── Pedidos ────────────────────────────────────────────────────────────────────
export const getPedidos  = (params) => api.get('/pedidos', { params });
export const crearPedido = (data)   => api.post('/pedidos', data);

// ── Pagos PSE ──────────────────────────────────────────────────────────────────
export const getBancos          = ()    => api.get('/pagos-pse/bancos');
export const iniciarPago        = (data) => api.post('/pagos-pse', data);
export const consultarTransaccion = (ref) => api.get(`/pagos-pse/${ref}`);