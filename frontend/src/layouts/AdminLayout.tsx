import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AdminLayout() {
  const { logout, user } = useAuth();

  return (
    <div className="container">
      <header className="navbar">
        <div>
          <strong>Admin</strong> {user?.email}
        </div>
        <div>
          <Link to="products">Productos</Link>
          <Link to="stock">Stock bajo</Link>
          <button onClick={logout} className="secondary">
            Salir
          </button>
        </div>
      </header>
      <div className="card">
        <Outlet />
      </div>
    </div>
  );
}
