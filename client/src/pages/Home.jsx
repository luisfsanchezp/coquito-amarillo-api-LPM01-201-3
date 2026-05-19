import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero">
        <div className="hero-tag">⚡ Tienda Virtual v1.0</div>
        <h1 className="hero-title">
          <span className="accent">Provv</span><span>Tecno</span><br />
          <span className="dim">Tu aliado tech</span>
        </h1>
        <p className="hero-sub">
          Tecnología, accesorios y software digital. Compra segura con pasarela PSE — ACH Colombia.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => navigate('/tienda')}>
            Ver tienda →
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/pedidos')}>
            Mis pedidos
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat"><div className="stat-val">5+</div><div className="stat-label">Productos</div></div>
          <div className="stat"><div className="stat-val">18</div><div className="stat-label">Bancos PSE</div></div>
          <div className="stat"><div className="stat-val">100%</div><div className="stat-label">Seguro</div></div>
          <div className="stat"><div className="stat-val">REST</div><div className="stat-label">API activa</div></div>
        </div>
      </div>

      <div className="page" style={{ paddingTop: 0 }}>
        <div className="section-line" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: '1rem' }}>
          {[
            { icon: '🖥️', titulo: 'Tecnología',  desc: 'Cámaras, monitores y más' },
            { icon: '🖱️', titulo: 'Accesorios',  desc: 'Mouse, teclados, hubs' },
            { icon: '💿', titulo: 'Software',     desc: 'Licencias y suscripciones' },
            { icon: '🔒', titulo: 'Pago PSE',     desc: 'ACH Colombia integrado' },
          ].map(c => (
            <div key={c.titulo}
              className="producto-card"
              style={{ cursor: 'default' }}
              onClick={() => c.titulo !== 'Pago PSE' ? navigate('/tienda') : navigate('/pagos')}
            >
              <div className="producto-img" style={{ cursor: 'pointer' }}>{c.icon}</div>
              <div className="producto-body">
                <div className="producto-nombre">{c.titulo}</div>
                <div className="producto-desc">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-line" />
        <div className="alert alert-info">
          💡 API REST activa en <strong>/api/productos</strong> — <strong>/api/pedidos</strong> — <strong>/api/pagos-pse</strong>
        </div>
      </div>
    </>
  );
}