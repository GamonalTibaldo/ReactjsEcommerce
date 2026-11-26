import { useState, useEffect } from 'react';

export const usePaginacion = (items = [], tamanoPagina = 6, dependenciaReset = null) => {
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    setPaginaActual(1);
  }, [dependenciaReset]);

  const totalPaginas = Math.max(1, Math.ceil(items.length / tamanoPagina));
  const paginaSegura = Math.min(paginaActual, totalPaginas);

  const indiceInicio = (paginaSegura - 1) * tamanoPagina;
  const elementosPaginados = items.slice(indiceInicio, indiceInicio + tamanoPagina);

  const irAPagina = (numeroPagina) => {
    if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
      setPaginaActual(numeroPagina);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const paginaSiguiente = () => irAPagina(paginaSegura + 1);
  const paginaAnterior = () => irAPagina(paginaSegura - 1);

  return {
    elementosPaginados,
    paginaActual: paginaSegura,
    totalPaginas,
    irAPagina,
    paginaSiguiente,
    paginaAnterior,
    hayPaginacion: items.length > tamanoPagina,
  };
};