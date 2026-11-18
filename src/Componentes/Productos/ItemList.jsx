import { PackageOpen } from 'lucide-react';
import Item from './Item.jsx';
import styles from './ItemList.module.css';

const ItemList = ({ productos }) => {
  if (productos.length === 0) {
    return (
      <div className="text-center py-5 text-light">
        <PackageOpen size={48} className="text-info mb-3" />
        <h4>No hay productos disponibles en esta categoría</h4>
        <p className="text-secondary">
          Estamos actualizando nuestro stock. Seleccioná otra categoría para seguir explorando.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {productos.map((prod) => (
        <Item key={prod.id} {...prod} />
      ))}
    </div>
  );
};

export default ItemList;