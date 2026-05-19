import { NavLink } from 'react-router-dom';

export default function Navbar({ cartCount, onCartOpen }) {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        💻 <span>Provv</span>Tecno
      </NavLink>

      <div className="nav-links">
        <NavLink to="/"        className={({ isActive }) => isActive ? 'active' : ''}>Inicio</NavLink>
        <NavLink to="/tienda"  className={({ isActive }) => isActive ? 'active' : ''}>Tienda</NavLink>
        <NavLink to="/pedidos" className={({ isActive }) => isActive ? 'active' : ''}>Pedidos</NavLink>
        <NavLink to="/pagos"   className={({ isActive }) => isActive ? 'active' : ''}>PSE</NavLink>
      </div>

      <button className="cart-btn" onClick={onCartOpen}>
        🛒 Carrito
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </button>
    </nav>
  );
}