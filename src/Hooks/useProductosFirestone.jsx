import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

export const useProductosFirestore = ({
  db,
  nombreColeccion = 'productos',
  categoria = null,
  campoOrden = 'nombre',
  direccionOrden = 'asc',
}) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setCargando(true);

    const productosRef = collection(db, nombreColeccion);

    // Evitamos combinar where() y orderBy() en Firestore para no requerir índice compuesto
    const consulta = categoria
      ? query(productosRef, where('categoria', '==', categoria))
      : campoOrden
      ? query(productosRef, orderBy(campoOrden, direccionOrden))
      : productosRef;

    getDocs(consulta)
      .then((respuesta) => {
        const docsFormateados = respuesta.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (campoOrden) {
          docsFormateados.sort((a, b) => {
            const valA = String(a[campoOrden] ?? '').toLowerCase();
            const valB = String(b[campoOrden] ?? '').toLowerCase();
            return direccionOrden === 'desc'
              ? valB.localeCompare(valA)
              : valA.localeCompare(valB);
          });
        }

        setProductos(docsFormateados);
      })
      .catch((error) => {
        console.error('Error al traer productos de Firestore:', error);
      })
      .finally(() => {
        setCargando(false);
      });
  }, [db, nombreColeccion, categoria, campoOrden, direccionOrden]);

  return { productos, cargando };
};
