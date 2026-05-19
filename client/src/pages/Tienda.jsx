import { useState, useEffect } from 'react';
import { getProductos } from '../services/api';

const fmt = (n) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);
const ICONS = { tecnologia: '🖥️', accesorios: '🖱️', software: '💿' };
const CATS  = ['todos', 'tecnologia', 'accesorios', 'software'];

export default function Tienda({ onAddToCart }) {
  const [productos, setProductos] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState('');
  const [cat,       setCat]       = useState('todos');
  const [added,     setAdded]     = useState({});

  useEffect(() => {
    const params = cat !== 'todos' ? { categoria: cat } : {};
    setLoading(true);
    getProductos(params)
      .then(r => setProductos(r.data.data))
      .catch(() => setError('No se pudo cargar el catálogo. Verifica que el servidor esté corriendo.'))
      .finally(() => setLoading(false));
  }, [cat]);

  const handleAdd = (p) => {
    onAddToCart(p);
    setAdded(a => ({ ...a, [p.id]: true }));
    setTimeout(() => setAdded(a => ({ ...a, [p.id]: false })), 1200);
  };

  return (
    <div className="page">
      <h1 className="page-title">Catálogo <span>ProvvTecno</span></h1>
      <p className="page-sub">// {productos.length} productos disponibles — GET /api/productos</p>

      <div className="filtros">
        {CATS.map(c => (
          <button key={c} className={`filtro-btn ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>
            {c === 'todos' ? '⚡ Todos' : `${ICONS[c]} ${c.charAt(0).toUpperCase() + c.slice(1)}`}
          </button>
        ))}
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading"><div className="spinner" /> Cargando productos...</div>
      ) : (
        <div className="productos-grid">
          {productos.map(p => (
            <div className="producto-card" key={p.id}>
              <div className="producto-img">
                {ICONS[p.categoria] || '📦'}
                <span className="categoria-badge">{p.categoria}</span>
              </div>
              <div className="producto-body">
                <div className="producto-nombre">{p.nombre}</div>
                <div className="producto-desc">{p.descripcion}</div>
                <div className="producto-footer">
                  <span className="producto-precio">{fmt(p.precio)}</span>
                  <span className="stock-badge">Stock: {p.stock}</span>
                </div>
                <button
                  className="btn-agregar"
                  onClick={() => handleAdd(p)}
                  disabled={p.stock === 0}
                  style={added[p.id] ? { background: 'rgba(16,185,129,0.2)', borderColor: 'var(--success)', color: 'var(--success)' } : {}}
                >
                  {added[p.id] ? '✓ Agregado' : p.stock === 0 ? 'Sin stock' : '+ Agregar al carrito'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}