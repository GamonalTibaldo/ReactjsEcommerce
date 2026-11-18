import { useParams } from 'react-router-dom';
import ItemList from './ItemList.jsx';
import CategoriasNav from './CategoriasNav.jsx';

const PRODUCTOS_MOCK = [
  {
    id: 1,
    nombre: "Notebook Gamer Acer Nitro Lite 16",
    precio: 1993244,
    categoria: "notebooks",
    stock: 5,
    imagen: "" // Podés pegar acá la URL de la foto cuando quieras
  },
  {
    id: 2,
    nombre: "Procesador AMD Ryzen 5 5600X",
    precio: 245000,
    categoria: "procesadores",
    stock: 10,
    imagen: ""
  },
  {
    id: 3,
    nombre: "Placa de Video RTX 4060 8GB",
    precio: 580000,
    categoria: "placas-video",
    stock: 4,
    imagen: ""
  },
];

const ItemListContainer = () => {
  const { categoriaId } = useParams();

  // Si hay una categoría en la URL (/categoria/:categoriaId), filtramos; si no, mostramos todos
  const productosFiltrados = categoriaId
    ? PRODUCTOS_MOCK.filter((prod) => prod.categoria === categoriaId)
    : PRODUCTOS_MOCK;

  return (
    <section>
      <CategoriasNav />
      <ItemList productos={productosFiltrados} />
    </section>
  );
};

export default ItemListContainer;