import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import {
  PlusCircle,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  Search,
  Image as ImageIcon,
  Pencil,
  Save,
  X,
  Upload,
  Loader2,
} from 'lucide-react';
import { db } from '../Firebase/config.js';
import { useAuth } from '../Context/AuthContext.jsx';
import styles from './AdminPanel.module.css';

const AdminPanel = () => {
  const { usuario } = useAuth();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [productoEditando, setProductoEditando] = useState(null);
  const [guardandoEdicion, setGuardandoEdicion] = useState(false);

  // Estados para subida a imgbb
  const [subiendoImgNueva, setSubiendoImgNueva] = useState(false);
  const [errorImgNueva, setErrorImgNueva] = useState('');
  const [subiendoImgEdit, setSubiendoImgEdit] = useState(false);
  const [errorImgEdit, setErrorImgEdit] = useState('');

  const [nuevoProd, setNuevoProd] = useState({
    nombre: '',
    precio: '',
    categoria: 'notebooks',
    stock: '',
    imagen: '',
    detalles: '',
  });

  if (!usuario || usuario.rol !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const mostrarExito = (texto) => {
    setMensajeExito(texto);
    setTimeout(() => setMensajeExito(''), 3000);
  };

  const cargarProductos = async () => {
    setCargando(true);
    try {
      const snapshot = await getDocs(collection(db, 'productos'));
      const lista = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProductos(lista);
    } catch (error) {
      console.error('Error al cargar inventario:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // Función reutilizable para subir imagen a imgbb
  const subirImagenImgbb = async (archivo) => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    if (!apiKey) {
      throw new Error('Falta configurar VITE_IMGBB_API_KEY en el archivo .env');
    }

    const formData = new FormData();
    formData.append('image', archivo);

    const respuesta = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const resultado = await respuesta.json();

    if (!respuesta.ok || !resultado.success) {
      throw new Error(
        resultado?.error?.message || 'No se pudo subir la imagen a imgbb.'
      );
    }

    return resultado.data.url;
  };

  const handleSeleccionarImagenNueva = async (e) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    setErrorImgNueva('');
    setSubiendoImgNueva(true);
    try {
      const urlSubida = await subirImagenImgbb(archivo);
      setNuevoProd((prev) => ({ ...prev, imagen: urlSubida }));
    } catch (error) {
      console.error('Error al subir imagen:', error);
      setErrorImgNueva(error.message);
    } finally {
      setSubiendoImgNueva(false);
      e.target.value = '';
    }
  };

  const handleSeleccionarImagenEdicion = async (e) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    setErrorImgEdit('');
    setSubiendoImgEdit(true);
    try {
      const urlSubida = await subirImagenImgbb(archivo);
      setProductoEditando((prev) => ({ ...prev, imagen: urlSubida }));
    } catch (error) {
      console.error('Error al subir imagen en edición:', error);
      setErrorImgEdit(error.message);
    } finally {
      setSubiendoImgEdit(false);
      e.target.value = '';
    }
  };

  const handleAgregarProducto = async (e) => {
    e.preventDefault();
    if (subiendoImgNueva) return;

    try {
      await addDoc(collection(db, 'productos'), {
        nombre: nuevoProd.nombre.trim(),
        precio: Number(nuevoProd.precio),
        categoria: nuevoProd.categoria,
        stock: Number(nuevoProd.stock),
        imagen: nuevoProd.imagen.trim(),
        detalles: nuevoProd.detalles.trim(),
      });
      setNuevoProd({
        nombre: '',
        precio: '',
        categoria: 'notebooks',
        stock: '',
        imagen: '',
        detalles: '',
      });
      setErrorImgNueva('');
      mostrarExito('¡Producto agregado al catálogo!');
      cargarProductos();
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  const iniciarEdicion = (prod) => {
    setErrorImgEdit('');
    setProductoEditando({
      id: prod.id,
      nombre: prod.nombre ?? '',
      precio: prod.precio ?? '',
      categoria: prod.categoria ?? 'notebooks',
      stock: prod.stock ?? 0,
      imagen: prod.imagen ?? '',
      detalles: prod.detalles ?? '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGuardarEdicion = async (e) => {
    e.preventDefault();
    if (!productoEditando?.id || subiendoImgEdit) return;

    setGuardandoEdicion(true);
    try {
      const datosActualizados = {
        nombre: productoEditando.nombre.trim(),
        precio: Number(productoEditando.precio),
        categoria: productoEditando.categoria,
        stock: Math.max(0, Number(productoEditando.stock)),
        imagen: productoEditando.imagen.trim(),
        detalles: productoEditando.detalles.trim(),
      };

      await updateDoc(doc(db, 'productos', productoEditando.id), datosActualizados);

      setProductos((prev) =>
        prev.map((p) =>
          p.id === productoEditando.id ? { ...p, ...datosActualizados } : p
        )
      );

      setProductoEditando(null);
      mostrarExito('¡Producto actualizado correctamente!');
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    } finally {
      setGuardandoEdicion(false);
    }
  };

  const handleCambiarStock = async (id, stockActual, delta) => {
    const nuevoStock = Math.max(0, Number(stockActual) + delta);
    try {
      await updateDoc(doc(db, 'productos', id), { stock: nuevoStock });
      setProductos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, stock: nuevoStock } : p))
      );
      if (productoEditando?.id === id) {
        setProductoEditando((prev) => ({ ...prev, stock: nuevoStock }));
      }
    } catch (error) {
      console.error('Error al actualizar stock:', error);
    }
  };

  const handleEliminarProducto = async (id, nombre) => {
    if (!window.confirm(`¿Seguro que querés eliminar "${nombre}" del catálogo?`)) return;
    try {
      await deleteDoc(doc(db, 'productos', id));
      setProductos((prev) => prev.filter((p) => p.id !== id));
      if (productoEditando?.id === id) {
        setProductoEditando(null);
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const productosFiltrados = productos.filter(
    (p) =>
      p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.categoria?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className={styles.wrapper}>
      {/* Encabezado */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <ShieldCheck size={28} />
          </div>
          <div>
            <h2 className={styles.title}>Panel de Administración</h2>
            <p className={styles.subtitle}>
              TEOFOREVER COMPUTERS • Gestión de stock y productos
            </p>
          </div>
        </div>
      </header>

      {mensajeExito && (
        <div className={styles.alertaExito}>{mensajeExito}</div>
      )}

      {/* Tarjeta de edición */}
      {productoEditando && (
        <div className={`${styles.card} ${styles.cardEdicion}`}>
          <div className={styles.cardHeader}>
            <h5 className={styles.cardTitle}>
              <Pencil size={18} />
              <span>Editando: {productoEditando.nombre || 'Producto'}</span>
            </h5>
            <button
              type="button"
              onClick={() => setProductoEditando(null)}
              className={styles.btnSecundario}
            >
              <X size={15} />
              <span>Cancelar</span>
            </button>
          </div>

          <form onSubmit={handleGuardarEdicion} className={styles.formGridEdicion}>
            <div className={`${styles.campoGrupo} ${styles.colSpan5}`}>
              <label className={styles.label}>Nombre del producto</label>
              <input
                type="text"
                required
                className={styles.input}
                value={productoEditando.nombre}
                onChange={(e) =>
                  setProductoEditando({ ...productoEditando, nombre: e.target.value })
                }
              />
            </div>

            <div className={`${styles.campoGrupo} ${styles.colSpan3}`}>
              <label className={styles.label}>Categoría</label>
              <select
                className={styles.select}
                value={productoEditando.categoria}
                onChange={(e) =>
                  setProductoEditando({ ...productoEditando, categoria: e.target.value })
                }
              >
                <option value="notebooks">Notebooks</option>
                <option value="procesadores">Procesadores</option>
                <option value="placas de video">Placas de Video</option>
                <option value="memorias-ram">Memorias RAM</option>
                <option value="almacenamiento">Almacenamiento</option>
                <option value="perifericos">Periféricos</option>
              </select>
            </div>

            <div className={`${styles.campoGrupo} ${styles.colSpan2}`}>
              <label className={styles.label}>Precio ($)</label>
              <input
                type="number"
                min="1"
                required
                className={styles.input}
                value={productoEditando.precio}
                onChange={(e) =>
                  setProductoEditando({ ...productoEditando, precio: e.target.value })
                }
              />
            </div>

            <div className={`${styles.campoGrupo} ${styles.colSpan2}`}>
              <label className={styles.label}>Stock</label>
              <input
                type="number"
                min="0"
                required
                className={styles.input}
                value={productoEditando.stock}
                onChange={(e) =>
                  setProductoEditando({ ...productoEditando, stock: e.target.value })
                }
              />
            </div>

            <div className={`${styles.campoGrupo} ${styles.colSpan6}`}>
              <label className={styles.label}>Detalles del producto</label>
              <textarea
                rows="4"
                className={styles.textarea}
                value={productoEditando.detalles}
                onChange={(e) =>
                  setProductoEditando({ ...productoEditando, detalles: e.target.value })
                }
                placeholder="Escribí o completá los detalles del producto..."
              />
            </div>

            <div className={`${styles.campoGrupo} ${styles.colSpan6}`}>
              <label className={styles.label}>Imagen del producto</label>

              <label
                className={`${styles.btnSubirArchivo} ${
                  subiendoImgEdit ? styles.btnSubirArchivoDisabled : ''
                }`}
              >
                {subiendoImgEdit ? (
                  <>
                    <Loader2 size={17} className={styles.spinnerIcon} />
                    <span>Subiendo imagen a imgbb...</span>
                  </>
                ) : (
                  <>
                    <Upload size={17} />
                    <span>Subir imagen desde la PC</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  disabled={subiendoImgEdit}
                  onChange={handleSeleccionarImagenEdicion}
                  className={styles.fileInputOculto}
                />
              </label>

              {errorImgEdit && (
                <span className={styles.errorUpload}>{errorImgEdit}</span>
              )}

              <input
                type="url"
                className={styles.input}
                value={productoEditando.imagen}
                onChange={(e) =>
                  setProductoEditando({ ...productoEditando, imagen: e.target.value })
                }
                placeholder="O pegá una URL https://..."
              />
            </div>

            <div className={`${styles.colSpan12} ${styles.accionesEdicion}`}>
              <button
                type="button"
                onClick={() => setProductoEditando(null)}
                className={styles.btnSecundario}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={guardandoEdicion || subiendoImgEdit}
                className={styles.btnPrimario}
              >
                <Save size={17} />
                <span>{guardandoEdicion ? 'Guardando...' : 'Guardar cambios'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grilla principal */}
      <div className={styles.gridPrincipal}>
        {/* Columna izquierda: Cargar producto */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h5 className={styles.cardTitle}>Cargar Nuevo Producto</h5>
          </div>

          <form onSubmit={handleAgregarProducto} className={styles.form}>
            <div className={styles.campoGrupo}>
              <label className={styles.label}>Nombre del producto</label>
              <input
                type="text"
                required
                className={styles.input}
                value={nuevoProd.nombre}
                onChange={(e) => setNuevoProd({ ...nuevoProd, nombre: e.target.value })}
                placeholder="Ej: Placa de Video RTX 4060"
              />
            </div>

            <div className={styles.campoGrupo}>
              <label className={styles.label}>Categoría</label>
              <select
                className={styles.select}
                value={nuevoProd.categoria}
                onChange={(e) => setNuevoProd({ ...nuevoProd, categoria: e.target.value })}
              >
                <option value="notebooks">Notebooks</option>
                <option value="procesadores">Procesadores</option>
                <option value="placas de video">Placas de Video</option>
                <option value="memorias-ram">Memorias RAM</option>
                <option value="almacenamiento">Almacenamiento</option>
                <option value="perifericos">Periféricos</option>
              </select>
            </div>

            <div className={styles.filaDoble}>
              <div className={styles.campoGrupo}>
                <label className={styles.label}>Precio ($)</label>
                <input
                  type="number"
                  min="1"
                  required
                  className={styles.input}
                  value={nuevoProd.precio}
                  onChange={(e) => setNuevoProd({ ...nuevoProd, precio: e.target.value })}
                  placeholder="450000"
                />
              </div>

              <div className={styles.campoGrupo}>
                <label className={styles.label}>Stock inicial</label>
                <input
                  type="number"
                  min="0"
                  required
                  className={styles.input}
                  value={nuevoProd.stock}
                  onChange={(e) => setNuevoProd({ ...nuevoProd, stock: e.target.value })}
                  placeholder="10"
                />
              </div>
            </div>

            <div className={styles.campoGrupo}>
              <label className={styles.label}>Detalles del producto</label>
              <textarea
                rows="3"
                className={styles.textarea}
                value={nuevoProd.detalles}
                onChange={(e) => setNuevoProd({ ...nuevoProd, detalles: e.target.value })}
                placeholder="Ej: 8GB GDDR6, DLSS 3, ideal para 1080p en ultra y edición..."
              />
            </div>

            <div className={styles.campoGrupo}>
              <label className={styles.label}>Imagen del producto</label>

              <label
                className={`${styles.btnSubirArchivo} ${
                  subiendoImgNueva ? styles.btnSubirArchivoDisabled : ''
                }`}
              >
                {subiendoImgNueva ? (
                  <>
                    <Loader2 size={17} className={styles.spinnerIcon} />
                    <span>Subiendo imagen a imgbb...</span>
                  </>
                ) : (
                  <>
                    <Upload size={17} />
                    <span>Subir imagen desde la PC</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  disabled={subiendoImgNueva}
                  onChange={handleSeleccionarImagenNueva}
                  className={styles.fileInputOculto}
                />
              </label>

              {errorImgNueva && (
                <span className={styles.errorUpload}>{errorImgNueva}</span>
              )}

              <input
                type="url"
                className={styles.input}
                value={nuevoProd.imagen}
                onChange={(e) => setNuevoProd({ ...nuevoProd, imagen: e.target.value })}
                placeholder="O pegá una URL https://..."
              />
            </div>

            <div className={styles.previewBox}>
              {nuevoProd.imagen ? (
                <img
                  src={nuevoProd.imagen}
                  alt="Vista previa"
                  className={styles.previewImg}
                  onError={(e) => (e.target.style.display = 'none')}
                />
              ) : (
                <div className={styles.previewPlaceholder}>
                  <ImageIcon size={20} />
                  <span>Vista previa</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={subiendoImgNueva}
              className={styles.btnPrimario}
            >
              <PlusCircle size={18} />
              <span>Agregar al Catálogo</span>
            </button>
          </form>
        </div>

        {/* Columna derecha: Inventario */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h5 className={`${styles.cardTitle} ${styles.cardTitleLight}`}>
              Inventario Actual ({productosFiltrados.length})
            </h5>

            <div className={styles.buscadorBox}>
              <Search size={16} color="#00d4ff" />
              <input
                type="text"
                className={styles.buscadorInput}
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar..."
              />
            </div>
          </div>

          {cargando ? (
            <p className={styles.estadoVacio}>Cargando inventario...</p>
          ) : productosFiltrados.length === 0 ? (
            <p className={styles.estadoVacio}>No hay productos para mostrar.</p>
          ) : (
            <div className={styles.tablaWrapper}>
              <table className={styles.tabla}>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th className={styles.thCenter}>Stock</th>
                    <th className={styles.thRight}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productosFiltrados.map((prod) => (
                    <tr key={prod.id}>
                      <td className={styles.prodNombre}>{prod.nombre}</td>
                      <td>
                        <span className={styles.badgeCategoria}>{prod.categoria}</span>
                      </td>
                      <td className={styles.precioTexto}>
                        ${Number(prod.precio).toLocaleString('es-AR')}
                      </td>
                      <td className={styles.tdCenter}>
                        <div className={styles.stockControles}>
                          <button
                            type="button"
                            onClick={() => handleCambiarStock(prod.id, prod.stock, -1)}
                            className={styles.btnStock}
                          >
                            <Minus size={13} />
                          </button>
                          <span
                            className={`${styles.badgeStock} ${
                              prod.stock === 0
                                ? styles.stockCero
                                : prod.stock <= 3
                                ? styles.stockBajo
                                : styles.stockOk
                            }`}
                          >
                            {prod.stock}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCambiarStock(prod.id, prod.stock, 1)}
                            className={styles.btnStock}
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </td>
                      <td className={styles.tdRight}>
                        <div className={styles.accionesFila}>
                          <button
                            type="button"
                            onClick={() => iniciarEdicion(prod)}
                            className={styles.btnIconoEditar}
                            title="Editar producto"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEliminarProducto(prod.id, prod.nombre)}
                            className={styles.btnIconoEliminar}
                            title="Eliminar producto"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;