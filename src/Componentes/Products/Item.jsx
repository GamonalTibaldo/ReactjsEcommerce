import styles from './Item.module.css';

const Item = ({ nombre, precio, imagen }) => {
  return (
    <article className={styles.card}>
      {/* Si después le agregás imagen al objeto del producto, se muestra sola */}
      {imagen && (
        <img 
          src={imagen} 
          alt={nombre} 
          className="img-fluid rounded mb-3" 
          style={{ height: '160px', objectFit: 'contain', backgroundColor: '#fff', padding: '8px' }}
        />
      )}

      <div>
        <h3 className={styles.title}>{nombre}</h3>
        <p className={styles.price}>${precio}</p>
      </div>

      <button className="btn btn-primary w-100 mt-auto">
        Ver detalle
      </button>
    </article>
  );
};

export default Item;

















