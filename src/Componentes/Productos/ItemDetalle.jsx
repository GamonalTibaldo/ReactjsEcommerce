import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { ShoppingCart, ArrowLeft, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { db } from '../../Firebase/config.js';
import { useCart } from '../../Context/CartContext.jsx';
import styles from './ItemDetalle.module.css';

const ItemDetalle = () => {
  const { id } = useParams();
  const { agregarAlCarrito } = useCart();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    const obtenerProducto = async () => {
      setCargando(true);
      setCantidad(1);
      try {
        const refDoc = doc(db, 'productos', id);
        const snap = await getDoc(refDoc);

        if (snap.exists()) {
          setProducto({ id: snap.id, ...snap.data() });
        } else {
          setProducto(null);
        }
      } catch (error) {
        console.error('Error al cargar el detalle del producto:', error);
        setProducto(null);
      } finally {
        setCargando(false);
      }
    };

    if (id) obtenerProducto();
  }, [id]);

  const handleAgregar = () => {
    if (!producto || Number(producto.stock) <= 0) return;

    const itemParaCarrito = {
      id: producto.id ?? producto.nombre,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      categoria: producto.categoria,
      stock: producto.stock,
      detalles: producto.detalles,
    };

    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito(itemParaCarrito);
    }

    setAgregado(true);
    setTimeout(() => setAgregado(false), 2200);
  };

  if (cargando) {
    return (
      <section className={styles.wrapper}>
        <p className={styles.stock}>Cargando detalle del producto...</p>
      </section>
    );
  }

  if (!producto) {
    return (
      <section className={styles.wrapper}>
        <h3 className={styles.titulo}>Producto no encontrado</h3>
        <Link to="/" className={styles.volverLink}>
          <ArrowLeft size={16} />
          <span>Volver al catálogo</span>
        </Link>
      </section>
    );
  }

  const categoriaTexto = producto.categoria ? producto.categoria.replace('-', ' ') : '';
  const stockNum = Number(producto.stock ?? 0);
  const sinStock = stockNum <= 0;

  return (
    <section className={styles.wrapper}>
      <Link to="/Productos" className={styles.volverLink}>
        <ArrowLeft size={16} />
        <span>Volver al catálogo</span>
      </Link>

      <div className={styles.contenedorDetalle}>
        {/* Columna izquierda: Foto */}
        <div className={styles.columnaImagen}>
          {producto.imagen ? (
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className={styles.imagen}
            />
          ) : (
            <span className={styles.stock}>Sin imagen disponible</span>
          )}
        </div>

        {/* Columna derecha: Toda la información y acciones */}
        <div className={styles.columnaInfo}>
          

          <h2 className={styles.titulo}>{producto.nombre}</h2>

          <p className={styles.stock}>
            Stock disponible:{' '}
            <strong style={{ color: sinStock ? '#f87171' : '#00d4ff' }}>
              {sinStock ? 'Sin stock' : `${stockNum} unidades`}
            </strong>
          </p>

          <p className={styles.precio}>
            ${Number(producto.precio).toLocaleString('es-AR')}
          </p>

          <p className={styles.descripcion}>
            {producto.detalles?.trim()
              ? producto.detalles
              : 'Sin detalles adicionales cargados para este producto.'}
          </p>

          {!sinStock && (
            <div className={styles.cantidadBox}>
              <span className={styles.cantidadLabel}>Cantidad:</span>
              <div className={styles.controlesCantidad}>
                <button
                  type="button"
                  className={styles.btnCantidad}
                  onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
                >
                  <Minus size={14} />
                </button>
                <span className={styles.cantidadValor}>{cantidad}</span>
                <button
                  type="button"
                  className={styles.btnCantidad}
                  onClick={() => setCantidad((prev) => Math.min(stockNum, prev + 1))}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            disabled={sinStock}
            onClick={handleAgregar}
            className={styles.btnAgregar}
          >
            <ShoppingCart size={18} />
            <span>{sinStock ? 'Sin stock' : 'Agregar al carrito'}</span>
          </button>

          {agregado && (
            <div className={styles.alertaOk}>
              <CheckCircle2 size={17} />
              <span>
                ¡Agregaste {cantidad} {cantidad === 1 ? 'unidad' : 'unidades'} al carrito!
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ItemDetalle;