import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPedidos, crearPedido } from '../services/api';

const fmt = (n) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);

const EMPTY_CLIENTE = { nombre: '', email: '', telefono: '', direccion: '' };

export default function Pedidos({ onClearCart }) {
  const location = useLocation();
  const cartInicial = location.state?.cart || [];

  const [pedidos,  setPedidos]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [sending,  setSending]  = useState(false);
  const [error,    setError]    = useState('');
  const [success,  setSuccess]  = useState('');
  const [cliente,  setCliente]  = useState(EMPTY_CLIENTE);
  const [tab,      setTab]      = useState(cartInicial.length > 0 ? 'nuevo' : 'lista');

  const carrito = cartInicial;
  const total   = carrito.reduce((a, i) => a + i.precio * i.cantidad, 0);

  const cargarPedidos = () => {
    getPedidos()
      .then(r => setPedidos(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { cargarPedidos(); }, []);

  const handleSubmit = async () => {
    setError(''); setSuccess('');
    if (!cliente.nombre || !cliente.email || !cliente.telefono || !cliente.direccion) {
      return setError('Completa todos los datos del cliente.');
    }
    if (!cliente.email.includes('@')) return setError('El email no es válido.');
    if (carrito.length === 0) return setError('El carrito está vacío.');

    setSending(true);
    try {
      const payload = {
        cliente,
        productos: carrito.map(i => ({
          producto_id   : i.id,
          nombre        : i.nombre,
          cantidad      : i.cantidad,
          precio_unitario: i.precio
        })),
        metodo_pago: 'PSE'
      };
      const res = await crearPedido(payload);
      setSuccess(`✅ Pedido ${res.data.data.numero_pedido} creado exitosamente`);
      setCliente(EMPTY_CLIENTE);
      if (onClearCart) onClearCart();
      cargarPedidos();
      setTab('lista');
    } catch (e) {
      const msgs = e.response?.data?.errores;
      setError(msgs ? msgs.join(' | ') : 'Error al crear el pedido.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">Gestión de <span>Pedidos</span></h1>
      <p className="page-sub">// POST /api/pedidos — GET /api/pedidos</p>

      <div className="filtros" style={{ marginBottom: '2rem' }}>
        <button className={`filtro-btn ${tab === 'lista'  ? 'active' : ''}`} onClick={() => setTab('lista')}>📋 Lista de pedidos</button>
        <button className={`filtro-btn ${tab === 'nuevo'  ? 'active' : ''}`} onClick={() => setTab('nuevo')}>+ Nuevo pedido</button>
      </div>

      {tab === 'nuevo' && (
        <div className="form-card">
          <div className="form-title">📦 Crear pedido</div>

          {error   && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {carrito.length > 0 ? (
            <div className="alert alert-info" style={{ marginBottom: '1rem' }}>
              🛒 {carrito.length} producto(s) — Total: <strong>{fmt(total)}</strong>
            </div>
          ) : (
            <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
              Carrito vacío. Agrega productos desde la <a href="/tienda" style={{ color: 'var(--accent)' }}>tienda</a>.
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Nombre completo</label>
            <input className="form-input" placeholder="Ej: Juan Pablo Herrera"
              value={cliente.nombre} onChange={e => setCliente({ ...cliente, nombre: e.target.value })} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="correo@email.com"
                value={cliente.email} onChange={e => setCliente({ ...cliente, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Teléfono</label>
              <input className="form-input" placeholder="310 000 0000"
                value={cliente.telefono} onChange={e => setCliente({ ...cliente, telefono: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Dirección de entrega</label>
            <input className="form-input" placeholder="Calle 80 #45-20, Medellín"
              value={cliente.direccion} onChange={e => setCliente({ ...cliente, direccion: e.target.value })} />
          </div>

          <button className="btn btn-primary" onClick={handleSubmit} disabled={sending || carrito.length === 0}>
            {sending ? '⏳ Procesando...' : '✅ Confirmar pedido'}
          </button>
        </div>
      )}

      {tab === 'lista' && (
        <>
          {loading ? (
            <div className="loading"><div className="spinner" />Cargando pedidos...</div>
          ) : pedidos.length === 0 ? (
            <div className="alert alert-info">No hay pedidos registrados aún.</div>
          ) : (
            pedidos.map(p => (
              <div className="pedido-card" key={p.id}>
                <div className="pedido-header">
                  <div>
                    <div className="pedido-num">{p.numero_pedido}</div>
                    <div className="pedido-cliente">👤 {p.cliente.nombre} — {p.cliente.email}</div>
                  </div>
                  <span className={`estado-badge estado-${p.estado}`}>{p.estado}</span>
                </div>
                <div className="pedido-items">
                  {p.productos.map((i, idx) => (
                    <span key={idx}>{i.nombre} x{i.cantidad}{idx < p.productos.length - 1 ? ' · ' : ''}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                  <span className="pedido-total">{fmt(p.total)}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text2)', fontFamily: 'var(--font-mono)' }}>
                    {new Date(p.createdAt).toLocaleDateString('es-CO')}
                  </span>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}