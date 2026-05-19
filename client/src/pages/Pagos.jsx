import { useState, useEffect } from 'react';
import { getBancos, iniciarPago, consultarTransaccion } from '../services/api';

const fmt = (n) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);

const EMPTY = {
  banco_codigo: '', tipo_persona: 'N', tipo_documento: 'CC',
  numero_documento: '', monto: '', descripcion: 'Compra tienda ProvvTecno',
  url_respuesta: 'https://provvtecno.com/pagos/respuesta'
};

export default function Pagos() {
  const [bancos,    setBancos]    = useState([]);
  const [form,      setForm]      = useState(EMPTY);
  const [resultado, setResultado] = useState(null);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');
  const [consulta,  setConsulta]  = useState('');
  const [txResult,  setTxResult]  = useState(null);

  useEffect(() => {
    getBancos().then(r => setBancos(r.data.data)).catch(() => {});
  }, []);

  const handlePago = async () => {
    setError(''); setResultado(null);
    if (!form.banco_codigo || !form.numero_documento || !form.monto) {
      return setError('Completa todos los campos obligatorios.');
    }
    setLoading(true);
    try {
      const res = await iniciarPago({ ...form, monto: Number(form.monto) });
      setResultado(res.data);
    } catch (e) {
      const msgs = e.response?.data?.errores;
      setError(msgs ? msgs.join(' | ') : e.response?.data?.mensaje || 'Error al procesar el pago.');
    } finally {
      setLoading(false);
    }
  };

  const handleConsultar = async () => {
    if (!consulta.trim()) return;
    setTxResult(null);
    try {
      const res = await consultarTransaccion(consulta.trim());
      setTxResult(res.data.data);
    } catch {
      setTxResult({ error: true });
    }
  };

  const estadoClass = (e) => e === 'APROBADO' ? 'aprobado' : e === 'PENDIENTE' ? 'pendiente' : 'rechazado';
  const estadoIcon  = (e) => e === 'APROBADO' ? '✅' : e === 'PENDIENTE' ? '⏳' : '❌';

  return (
    <div className="page">
      <h1 className="page-title">Pasarela <span>PSE</span></h1>
      <p className="page-sub">// POST /api/pagos-pse — ACH Colombia (simulado)</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

        {/* Formulario pago */}
        <div className="form-card">
          <div className="form-title">💳 Nueva transacción PSE</div>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="form-group">
            <label className="form-label">Banco *</label>
            <select className="form-select" value={form.banco_codigo}
              onChange={e => setForm({ ...form, banco_codigo: e.target.value })}>
              <option value="">— Selecciona tu banco —</option>
              {bancos.map(b => <option key={b.codigo} value={b.codigo}>{b.nombre}</option>)}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Tipo persona</label>
              <select className="form-select" value={form.tipo_persona}
                onChange={e => setForm({ ...form, tipo_persona: e.target.value })}>
                <option value="N">Natural</option>
                <option value="J">Jurídica</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Tipo documento</label>
              <select className="form-select" value={form.tipo_documento}
                onChange={e => setForm({ ...form, tipo_documento: e.target.value })}>
                {['CC', 'CE', 'NIT', 'TI', 'PP'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Número de documento *</label>
            <input className="form-input" placeholder="Ej: 1098765432"
              value={form.numero_documento}
              onChange={e => setForm({ ...form, numero_documento: e.target.value })} />
          </div>

          <div className="form-group">
            <label className="form-label">Monto (COP) *</label>
            <input className="form-input" type="number" placeholder="Mínimo $1.000"
              value={form.monto} onChange={e => setForm({ ...form, monto: e.target.value })} />
            {form.monto && <div style={{ fontSize: '0.8rem', color: 'var(--accent)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>
              {fmt(Number(form.monto))}
            </div>}
          </div>

          <div className="form-group">
            <label className="form-label">Descripción</label>
            <input className="form-input" value={form.descripcion}
              onChange={e => setForm({ ...form, descripcion: e.target.value })} />
          </div>

          <button className="btn btn-primary" onClick={handlePago} disabled={loading}>
            {loading ? '⏳ Procesando...' : '🔒 Pagar con PSE'}
          </button>

          {resultado && (
            <div className={`pse-result ${estadoClass(resultado.data.estado)}`}>
              <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{estadoIcon(resultado.data.estado)}</div>
              <div style={{ fontWeight: 800, fontSize: '1rem' }}>{resultado.mensaje}</div>
              <div className="pse-ref">Banco: {resultado.data.banco_nombre}</div>
              <div className="pse-ref">Monto: {fmt(resultado.data.monto)}</div>
              <div className="pse-ref">Código banco: {resultado.data.codigo_respuesta} — {resultado.data.mensaje_banco}</div>
              <div className="pse-ref" style={{ marginTop: 8, color: 'var(--accent)', fontWeight: 700 }}>
                Referencia: {resultado.data.referencia}
              </div>
            </div>
          )}
        </div>

        {/* Consulta de transacción */}
        <div>
          <div className="form-card" style={{ marginBottom: '1rem' }}>
            <div className="form-title">🔍 Consultar transacción</div>
            <div className="form-group">
              <label className="form-label">Referencia PSE</label>
              <input className="form-input" placeholder="TXN-20260421-001"
                value={consulta} onChange={e => setConsulta(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleConsultar()} />
            </div>
            <button className="btn btn-secondary" onClick={handleConsultar}>Consultar →</button>

            {txResult && !txResult.error && (
              <div className={`pse-result ${estadoClass(txResult.estado)}`} style={{ marginTop: '1rem' }}>
                <div style={{ fontWeight: 800 }}>{estadoIcon(txResult.estado)} {txResult.estado}</div>
                <div className="pse-ref">Ref: {txResult.referencia}</div>
                <div className="pse-ref">Banco: {txResult.banco_nombre}</div>
                <div className="pse-ref">Monto: {fmt(txResult.monto)} {txResult.moneda}</div>
                <div className="pse-ref">Tipo doc: {txResult.tipo_documento} — {txResult.numero_documento}</div>
              </div>
            )}
            {txResult?.error && <div className="alert alert-error" style={{ marginTop: '1rem' }}>Transacción no encontrada.</div>}
          </div>

          <div className="form-card">
            <div className="form-title" style={{ fontSize: '0.95rem' }}>ℹ️ Sobre PSE</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text2)', fontFamily: 'var(--font-mono)', lineHeight: 1.7 }}>
              Este módulo <strong style={{ color: 'var(--accent3)' }}>simula</strong> la pasarela PSE de ACH Colombia.<br />
              Los documentos se cifran con <strong>SHA-256</strong>.<br />
              Monto mínimo: $1.000 COP<br />
              Monto máximo: $10.000.000 COP<br />
              Bancos habilitados: {bancos.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}