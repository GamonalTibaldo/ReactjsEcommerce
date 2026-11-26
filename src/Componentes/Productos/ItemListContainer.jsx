import { useParams } from 'react-router-dom';
import { db } from '../../Firebase/config.js';
import { useProductosFirestore } from '../../Hooks/useProductosFirestone.jsx';
import { usePaginacion } from '../../Hooks/UsePaginacion.jsx';
import ItemList from './ItemList.jsx';
import CategoriasNav from './CategoriasNav.jsx';

const ItemListContainer = () => {
  const { categoriaId } = useParams();

  const { productos, cargando } = useProductosFirestore({
    db,
    nombreColeccion: 'productos',
    categoria: categoriaId || null,
    campoOrden: 'nombre',
    direccionOrden: 'asc',
  });

  const {
    elementosPaginados,
    paginaActual,
    totalPaginas,
    irAPagina,
    paginaSiguiente,
    paginaAnterior,
    hayPaginacion,
  } = usePaginacion(productos, 8, categoriaId);


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
        <>
          <ItemList productos={elementosPaginados} />

          {productos.length > 0 && (
            <nav
              aria-label="Paginación de productos"
              className="d-flex justify-content-center align-items-center gap-2 my-4 flex-wrap"
            >
              {paginaActual > 1 && (
                <button
                  type="button"
                  className="btn btn-outline-info btn-sm"
                  onClick={paginaAnterior}
                >
                  {'<'}
                </button>
              )}

              {Array.from({ length: totalPaginas }, (_, idx) => {
                const numero = idx + 1;
                const activa = numero === paginaActual;

                return (
                  <button
                    key={numero}
                    type="button"
                    className={`btn btn-sm ${activa ? 'btn-info text-dark fw-bold' : 'btn-outline-info'
                      }`}
                    onClick={() => irAPagina(numero)}
                  >
                    {numero}
                  </button>
                );
              })}

              {paginaActual < totalPaginas && (
                <button
                  type="button"
                  className="btn btn-outline-info btn-sm"
                  onClick={paginaSiguiente}
                >
                  {'>'}
                </button>
              )}
            </nav>
          )}
        </>
      )}
    </section>
  );
};

export default ItemListContainer;