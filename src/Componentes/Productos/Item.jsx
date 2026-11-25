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
        
        <h3 className={styles.title} title={nombre}>
          {nombre}
        </h3>
        <p className={styles.price}>${Number(precio).toLocaleString('es-AR')}</p>
      </div>

      <div className={styles.acciones}>
        <button
          type="button"
          onClick={handleAgregar}
          className={styles.btnAgregar}
        >
          <ShoppingCart size={18} />
          <span>Agregar al carrito</span>
        </button>

        <Link to={`/item/${id}`} className={styles.btnDetalle}>
          Ver detalle
        </Link>
      </div>
    </article>
  );
};

export default Item;