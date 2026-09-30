import { Link } from 'react-router-dom';
import Style from './Nav.module.css';

const Nav = () => {
  return (
    <nav className={Style.navContainer}>
      <ul className={Style.navList}>
        <li>
          <Link to="/" className={Style.navLink}>
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/QuienesSomos" className={Style.navLink}>
            Quienes Somos
          </Link>
        </li>
        <li>
          <Link to="/productos" className={Style.navLink}>
            Productos
          </Link>
        </li>
        <li>
          <Link to="/contacto" className={Style.navLink}>
            Contacto
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;