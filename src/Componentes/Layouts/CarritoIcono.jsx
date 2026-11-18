import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext.jsx';
import styles from './CarritoIcono.module.css';

const CarritoIcono = () => {
  const { cantidadTotal } = useCart();

  return (
    <Link to="/carrito" className={styles.cartLink} aria-label="Ver carrito">
      <ShoppingCart size={30} strokeWidth={2.2} />
      <span className={styles.badge}>{cantidadTotal}</span>
    </Link>
  );
};

export default CarritoIcono;