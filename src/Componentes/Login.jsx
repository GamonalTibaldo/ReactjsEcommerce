import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Lock, UserPlus, LogIn, User } from 'lucide-react';
import { useAuth } from '../Context/AuthContext.jsx';
import styles from './Login.module.css';

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
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.iconoBox}>
            <UserCheck size={28} />
          </div>
          <h3 className={styles.titulo}>
            {esRegistro ? 'Crear Cuenta Cliente' : 'Iniciar Sesión'}
          </h3>
          <p className={styles.subtitulo}>
            Ingresá con tu nombre de usuario (sin necesidad de correo)
          </p>
        </div>

        {error && (
          <div className={styles.errorBox} role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.campoGrupo}>
            <label htmlFor="usuario" className={styles.label}>
              <User size={15} />
              <span>Usuario</span>
            </label>
            <input
              id="usuario"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              placeholder="Ej: admin o juanperez"
            />
          </div>

          <div className={styles.campoGrupo}>
            <label htmlFor="password" className={styles.label}>
              <Lock size={15} />
              <span>Contraseña</span>
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Ingresá tu contraseña"
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className={styles.btnIngresar}
          >
            {esRegistro ? <UserPlus size={18} /> : <LogIn size={18} />}
            <span>
              {cargando
                ? 'Procesando...'
                : esRegistro
                ? 'Registrarme'
                : 'Ingresar'}
            </span>
          </button>
        </form>

        <div className={styles.footerRegistro}>
          <button
            type="button"
            onClick={() => {
              setEsRegistro(!esRegistro);
              setError('');
            }}
            className={styles.btnRegistro}
          >
            {esRegistro
              ? '¿Ya tenés cuenta? Iniciá sesión acá'
              : '¿Sos cliente nuevo? Registrate en 10 segundos'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;