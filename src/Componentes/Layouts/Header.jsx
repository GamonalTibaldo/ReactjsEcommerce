import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import Style from './Header.module.css';
import CarritoIcono from './CarritoIcono.jsx';

const Header = () => {
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
        <Link to="/login" className={Style.btnLogin}>
          <User size={18} />
          <span>Login</span>
        </Link>
        <CarritoIcono />
      </div>
    </header>
  );
};

export default Header;