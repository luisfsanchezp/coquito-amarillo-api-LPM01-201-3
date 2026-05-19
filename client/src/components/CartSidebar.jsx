import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const fmt = (n) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);

export default function CartSidebar({ cart, onClose, onUpdate, onRemove, onClear }) {
  const navigate  = useNavigate();
  const total     = cart.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

  const handlePedir = () => {
    onClose();
    navigate('/pedidos', { state: { cart } });
  };

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>🛒 Tu carrito <span style={{ color: 'var(--text2)', fontWeight: 400, fontSize: '0.85rem' }}>({cart.length} items)</span></h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="sidebar-body">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <p>Tu carrito está vacío</p>
              <p style={{ fontSize: '0.8rem', marginTop: '8px' }}>Agrega productos desde la tienda</p>
            </div>
          ) : cart.map(item => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-icon">{ICONS[item.categoria] || '📦'}</div>
              <div className="cart-item-info">
                <div className="cart-item-name">{item.nombre}</div>
                <div className="cart-item-price">{fmt(item.precio * item.cantidad)}</div>
              </div>
              <div className="cart-qty-controls">
                <button className="qty-btn" onClick={() => onUpdate(item.id, item.cantidad - 1)}>−</button>
                <span className="qty-val">{item.cantidad}</span>
                <button className="qty-btn" onClick={() => onUpdate(item.id, item.cantidad + 1)}>+</button>
                <button className="qty-btn" style={{ color: 'var(--danger)' }} onClick={() => onRemove(item.id)}>🗑</button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="sidebar-footer">
            <div className="cart-total">
              <span className="cart-total-label">TOTAL</span>
              <span className="cart-total-val">{fmt(total)}</span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handlePedir}>
              Crear pedido →
            </button>
            <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} onClick={onClear}>
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}

const ICONS = { tecnologia: '🖥️', accesorios: '🖱️', software: '💿' };