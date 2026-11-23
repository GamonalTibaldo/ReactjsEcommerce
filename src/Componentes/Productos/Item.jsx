import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../Context/CartContext.jsx';
import styles from './Item.module.css';

const Item = ({ id, nombre, precio, imagen, categoria, stock, detalles }) => {
  const { agregarAlCarrito } = useCart();

  // Formatea "placas-video" -> "placas video" para mostrarlo prolijo
  const categoriaTexto = categoria ? categoria.replace('-', ' ') : '';

  const handleAgregar = () => {
    agregarAlCarrito({
      id: id ?? nombre,
      nombre,
      precio,
      imagen,
      categoria,
      stock,
      detalles,
    });
  };

  return (
    <article className={styles.card}>
      {imagen && (
        <img
          src={imagen}
          alt={nombre}
          className="img-fluid rounded mb-3"
          style={{ height: '160px', objectFit: 'contain', backgroundColor: '#fff', padding: '8px' }}
        />
      )}

      <div>
        {categoriaTexto && (
          <span className="badge bg-info text-dark text-uppercase mb-2" style={{ fontSize: '0.72rem' }}>
            {categoriaTexto}
          </span>
        )}
        <h3 className={styles.title}>{nombre}</h3>
        <p className={styles.price}>${Number(precio).toLocaleString('es-AR')}</p>
      </div>

      <div className="d-flex flex-column gap-2 mt-auto">
        <button
          onClick={handleAgregar}
          className="btn btn-info fw-bold d-flex align-items-center justify-content-center gap-2"
        >
          <ShoppingCart size={18} />
          <span>Agregar al carrito</span>
        </button>

        <Link to={`/item/${id}`} className="btn btn-outline-light btn-sm w-100">
          Ver detalle
        </Link>
      </div>
    </article>
  );
};

export default Item;