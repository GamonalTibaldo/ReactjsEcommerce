import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Lock, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '../Context/AuthContext.jsx';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [esRegistro, setEsRegistro] = useState(false);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const { login, registrarCliente } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      if (esRegistro) {
        if (username.trim().toLowerCase() === 'admin') {
          setError('El nombre de usuario "admin" está reservado.');
          setCargando(false);
          return;
        }
        await registrarCliente(username, password);
        navigate('/Productos');
      } else {
        await login(username, password);
        if (username.trim().toLowerCase() === 'admin') {
          navigate('/admin');
        } else {
          navigate('/Productos');
        }
      }
    } catch (err) {
      console.error(err.code);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
        setError('Usuario o contraseña incorrectos.');
      } else if (err.code === 'auth/weak-password') {
        setError('La contraseña debe tener al menos 6 caracteres.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Ese nombre de usuario ya existe.');
      } else {
        setError('No se pudo completar la operación. Verificá los datos.');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card bg-dark border-info text-light p-4 shadow" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="text-center mb-4">
          <UserCheck size={44} className="text-info mb-2" />
          <h3 className="fw-bold">{esRegistro ? 'Crear Cuenta Cliente' : 'Iniciar Sesión'}</h3>
          <p className="text-secondary small mb-0">
            Ingresá con tu nombre de usuario (sin necesidad de correo)
          </p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label small text-secondary">Usuario</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control bg-dark text-light border-secondary"
              placeholder="Ej: admin o juanperez"
            />
          </div>

          <div>
            <label className="form-label small text-secondary">Contraseña</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-secondary">
                <Lock size={16} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control bg-dark text-light border-secondary"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
          </div>

          <button type="submit" disabled={cargando} className="btn btn-info fw-bold w-100 mt-2 py-2 d-flex align-items-center justify-content-center gap-2">
            {esRegistro ? <UserPlus size={18} /> : <LogIn size={18} />}
            {cargando ? 'Procesando...' : esRegistro ? 'Registrarme' : 'Ingresar'}
          </button>
        </form>

        <div className="text-center mt-3 pt-3 border-top border-secondary">
          <button
            type="button"
            onClick={() => {
              setEsRegistro(!esRegistro);
              setError('');
            }}
            className="btn btn-link text-info text-decoration-none small"
          >
            {esRegistro
              ? '¿Ya tenés cuenta? Iniciá sesión acá'
              : '¿Sos cliente nuevo? Registrate en 10 segundos'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;