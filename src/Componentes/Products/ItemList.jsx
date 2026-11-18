import Item from './Item';
import styles from './ItemList.module.css';

const ItemList = ({ products}) => {
  return (
    <div className={styles.grid}>
      {products.map((productos) => (<Item key={productos.id}  nombre={productos.nombre}  precio={productos.precio}  imagen={productos.imagen} />))}
    </div>
  );
};

export default ItemList;