import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar      from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import Home    from './pages/Home';
import Tienda  from './pages/Tienda';
import Pedidos from './pages/Pedidos';
import Pagos   from './pages/Pagos';

export default function App() {
  const [cart,      setCart]      = useState([]);
  const [cartOpen,  setCartOpen]  = useState(false);

  const addToCart = (producto) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.id === producto.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], cantidad: updated[idx].cantidad + 1 };
        return updated;
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeItem(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, cantidad: qty } : i));
  };

  const removeItem = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const clearCart  = ()   => setCart([]);

  const cartCount = cart.reduce((a, i) => a + i.cantidad, 0);

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      {cartOpen && (
        <CartSidebar
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdate={updateQty}
          onRemove={removeItem}
          onClear={clearCart}
        />
      )}

      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/tienda"  element={<Tienda onAddToCart={addToCart} />} />
        <Route path="/pedidos" element={<Pedidos onClearCart={clearCart} />} />
        <Route path="/pagos"   element={<Pagos />} />
      </Routes>
    </BrowserRouter>
  );
}