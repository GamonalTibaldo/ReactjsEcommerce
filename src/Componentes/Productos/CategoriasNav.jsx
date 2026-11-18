import { NavLink } from 'react-router-dom';
import styles from './CategoriasNav.module.css';

const CATEGORIAS = [
  { id: 'todos', nombre: 'Todos', ruta: '/Productos' },
  { id: 'notebooks', nombre: 'Notebooks', ruta: '/categoria/notebooks' },
    { id: 'procesadores', nombre: 'Procesadores', ruta: '/categoria/procesadores' },
    { id: 'placas-video', nombre: 'Placas de Video', ruta: '/categoria/placas-video' },
    { id: 'memorias', nombre: 'Memorias RAM', ruta: '/categoria/memorias' },
    { id: 'almacenamiento', nombre: 'Almacenamiento', ruta: '/categoria/almacenamiento' },
];

const CategoriasNav = () => {
  return (
    <nav className={styles.navCategorias} aria-label="Categorías de productos">
      {CATEGORIAS.map((cat) => (
        <NavLink
          key={cat.id}
          to={cat.ruta}
          className={({ isActive }) =>
            isActive ? `${styles.btnCat} ${styles.activo}` : styles.btnCat
          }
        >
          {cat.nombre}
        </NavLink>
      ))}
    </nav>
  );
};

export default CategoriasNav;
