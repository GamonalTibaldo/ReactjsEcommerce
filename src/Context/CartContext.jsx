import { createContext, useState, useContext } from 'react';

// 1. Creamos el contexto
const CartContext = createContext();

// 2. Hook personalizado para usar el carrito fácil desde cualquier componente
export const useCart = () => useContext(CartContext);

// 3. Proveedor que envuelve la aplicación
export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Agregar producto (si ya existe, suma la cantidad sin pasarse del stock)
  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito((prevCarrito) => {
      const stockMax =
        producto.stock !== undefined ? Number(producto.stock) : Infinity;
      const existe = prevCarrito.find((item) => item.id === producto.id);

      if (existe) {
        const nuevaCantidad = Math.min(stockMax, existe.cantidad + cantidad);
        return prevCarrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: nuevaCantidad } : item
        );
      }

      const cantidadInicial = Math.min(stockMax, cantidad);
      if (cantidadInicial <= 0) return prevCarrito;

      return [...prevCarrito, { ...producto, cantidad: cantidadInicial }];
    });
  };

  // Incrementar en 1 la cantidad de un producto
  const incrementarCantidad = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) => {
        if (item.id !== id) return item;
        const stockMax =
          item.stock !== undefined ? Number(item.stock) : Infinity;
        if (item.cantidad >= stockMax) return item;
        return { ...item, cantidad: item.cantidad + 1 };
      })
    );
  };

  // Decrementar en 1 la cantidad de un producto (mínimo 1)
  const decrementarCantidad = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) => {
        if (item.id !== id) return item;
        return { ...item, cantidad: Math.max(1, item.cantidad - 1) };
      })
    );
  };

  // Eliminar un producto puntual por su ID
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  // Vaciar todo el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Cantidad total de unidades (para el globito de CarritoIcono)
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // Precio total de la compra
  const precioTotal = carrito.reduce(
    (acc, item) => acc + Number(item.precio) * item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        incrementarCantidad,
        decrementarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        cantidadTotal,
        precioTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};