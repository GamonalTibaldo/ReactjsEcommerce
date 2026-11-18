import Item from './Item';
import styles from './ItemList.module.css';

const ItemList = ({ productos}) => {
  return (
    <div className={styles.grid}>
      {productos.map((productos) => (<Item key={productos.id}  nombre={productos.nombre}  precio={productos.precio}  imagen={productos.imagen} />))}
    </div>
  );
};

export default ItemList;