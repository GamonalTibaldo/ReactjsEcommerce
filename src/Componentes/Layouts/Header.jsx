import { Link, useNavigate } from 'react-router-dom';
import { User, ShieldCheck, LogOut } from 'lucide-react';
import Style from './Header.module.css';
import CarritoIcono from './CarritoIcono.jsx';
import { useAuth } from '../../Context/AuthContext.jsx';

const Header = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className={Style.header}>
      <div>
        <Link to="/">
          <img
            src="https://i.ibb.co/PsxkCq6R/logo.png"
            alt="TEOFOREVER COMPUTERS"
            height="80"
            className="d-inline-block align-text-top me-2"
          />
        </Link>
      </div>

      <div className={Style.acciones}>
        {usuario ? (
          <div className={Style.usuarioPanel}>
            <span className="text-light small">
              Hola, <strong className="text-info">{usuario.nombre}</strong>
            </span>

            {usuario.rol === 'admin' && (
              <Link to="/admin" className={Style.btn}>
                <ShieldCheck size={16} />
                <span>Admin</span>
              </Link>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className={Style.btn}
              title="Cerrar sesión"
            >
              <LogOut size={16} />
              <span>Salir</span>
            </button>
          </div>
        ) : (
          <Link to="/login" className={Style.btn}>
            <User size={18} />
            <span>Login</span>
          </Link>
        )}
        <CarritoIcono />
      </div>
    </header>
  );
};

export default Header;