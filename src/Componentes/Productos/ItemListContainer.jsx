import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase/config.js';
import ItemList from './ItemList.jsx';
import CategoriasNav from './CategoriasNav.jsx';

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { categoriaId } = useParams();

  useEffect(() => {
    setCargando(true);

    // Apuntamos a la colección 'productos' de Firestore
    const productosRef = collection(db, 'productos');

    // Si hay categoría seleccionada en la URL, filtramos directo en la consulta de Firebase
    const consulta = categoriaId
      ? query(productosRef, where('categoria', '==', categoriaId))
      : productosRef;

    getDocs(consulta)
      .then((respuesta) => {
        const docsFormateados = respuesta.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(docsFormateados);
      })
      .catch((error) => {
        console.error('Error al traer productos de Firestore:', error);
      })
      .finally(() => {
        setCargando(false);
      });
  }, [categoriaId]);

  return (
    <section>
      <CategoriasNav />

      {cargando ? (
        <div className="text-center py-5 text-light">
          <div className="spinner-border text-info mb-3" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="text-secondary">Cargando catálogo de TEOFOREVER COMPUTERS...</p>
        </div>
      ) : (
        <ItemList productos={productos} />
      )}
    </section>
  );
};

export default ItemListContainer;