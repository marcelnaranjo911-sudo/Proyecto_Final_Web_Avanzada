import { Link, Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="container">
      <header className="navbar">
        <div>
          <Link to="/">Productos</Link>
        </div>
        <div>
          <Link to="/login">Login administrador</Link>
        </div>
      </header>
      <div className="card">
        <Outlet />
      </div>
    </div>
  );
}
