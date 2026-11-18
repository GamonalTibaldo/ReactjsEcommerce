import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../Context/CartContext.jsx';
import styles from './Carrito.module.css';

const Carrito = () => {
  const {
    carrito,
    incrementarCantidad,
    decrementarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    precioTotal,
  } = useCart();

  // Vista cuando el carrito está vacío
  if (carrito.length === 0) {
    return (
      <section className={styles.vacioContainer}>
        <ShoppingBag size={64} className={styles.iconoVacio} />
        <h2>Tu carrito está vacío</h2>
        <p>Explorá nuestro catálogo de hardware y armá tu próxima PC.</p>
        <Link to="/Productos" className={styles.btnVolver}>
          <ArrowLeft size={18} />
          <span>Ver productos</span>
        </Link>
      </section>
    );
  }

  return (
    <section className={styles.carritoContainer}>
      <div className={styles.headerCarrito}>
        <h2>Tu Carrito de Compras</h2>
        <button onClick={vaciarCarrito} className={styles.btnVaciar}>
          Vaciar carrito
        </button>
      </div>

      <div className={styles.gridCarrito}>
        {/* Lista de productos agregados */}
        <div className={styles.listaItems}>
          {carrito.map((item) => (
            <article key={item.id} className={styles.itemCard}>
              <img
                src={item.imagen || item.img}
                alt={item.nombre || item.title}
                className={styles.itemImg}
              />

              <div className={styles.itemInfo}>
                <h3>{item.nombre || item.title}</h3>
                <p className={styles.precioUnitario}>
                  Unitario: ${item.precio.toLocaleString('es-AR')}
                </p>
              </div>

              {/* Controles - y + */}
              <div className={styles.controlesCantidad}>
                <button
                  onClick={() => decrementarCantidad(item.id)}
                  disabled={item.cantidad <= 1}
                  className={styles.btnCantidad}
                  aria-label="Restar unidad"
                >
                  <Minus size={16} />
                </button>

                <span className={styles.cantidadValor}>{item.cantidad}</span>

                <button
                  onClick={() => incrementarCantidad(item.id)}
                  disabled={item.stock !== undefined && item.cantidad >= item.stock}
                  className={styles.btnCantidad}
                  aria-label="Sumar unidad"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className={styles.subtotal}>
                ${(item.precio * item.cantidad).toLocaleString('es-AR')}
              </div>

              <button
                onClick={() => eliminarDelCarrito(item.id)}
                className={styles.btnEliminar}
                aria-label="Eliminar producto"
              >
                <Trash2 size={20} />
              </button>
            </article>
          ))}
        </div>

        {/* Resumen de compra */}
        <aside className={styles.resumen}>
          <h3>Resumen del pedido</h3>
          <div className={styles.filaResumen}>
            <span>Total a pagar:</span>
            <span className={styles.totalMonto}>
              ${precioTotal.toLocaleString('es-AR')}
            </span>
          </div>

          <button
            className={styles.btnFinalizar}
            onClick={() => alert('¡Próximamente conectamos esto con Firestore!')}
          >
            Finalizar Compra
          </button>

          <Link to="/Productos" className={styles.seguirComprando}>
            ← Seguir viendo productos
          </Link>
        </aside>
      </div>
    </section>
  );
};

export default Carrito;