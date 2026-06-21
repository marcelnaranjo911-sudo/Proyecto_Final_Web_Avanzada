import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = await login(email, password);
    if (!success) {
      setError('Usuario o contraseña incorrectos.');
      return;
    }
    navigate('/admin/products');
  };

  return (
    <div>
      <h1>Login administrador</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" />

        <label>Contraseña</label>
        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" />

        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Cuenta admin: admin@stockflow.com / admin123</p>
    </div>
  );
}
