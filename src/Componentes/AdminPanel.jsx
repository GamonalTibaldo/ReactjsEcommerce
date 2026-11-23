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
} from 'lucide-react';
import { db } from '../Firebase/config.js';
import { useAuth } from '../Context/AuthContext.jsx';

const AdminPanel = () => {
  const { usuario } = useAuth();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

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

  const handleAgregarProducto = async (e) => {
    e.preventDefault();
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
      setMensajeExito('¡Producto agregado al catálogo!');
      setTimeout(() => setMensajeExito(''), 3000);
      cargarProductos();
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  const handleCambiarStock = async (id, stockActual, delta) => {
    const nuevoStock = Math.max(0, Number(stockActual) + delta);
    try {
      await updateDoc(doc(db, 'productos', id), { stock: nuevoStock });
      setProductos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, stock: nuevoStock } : p))
      );
    } catch (error) {
      console.error('Error al actualizar stock:', error);
    }
  };

  const handleEliminarProducto = async (id, nombre) => {
    if (!window.confirm(`¿Seguro que querés eliminar "${nombre}" del catálogo?`)) return;
    try {
      await deleteDoc(doc(db, 'productos', id));
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const productosFiltrados = productos.filter(
    (p) =>
      p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.categoria?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const cajaEstilo = {
    backgroundColor: '#121622',
    borderRadius: '14px',
    border: '1px solid rgba(0, 212, 255, 0.25)',
    boxShadow: '0 10px 10px rgba(0, 0, 0, 0.45)',
  };

  const campoEstilo = {
    backgroundColor: '#1b2030',
    color: '#f8f9fa',
    border: '1px solid #3a4259',
    borderRadius: '8px',
    padding: '10px 10px',
  };

  return (
    <div className="container py-4 text-light">
      {/* Encabezado */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-3 border-bottom border-secondary">
        <div className="d-flex align-items-center gap-3">
          <div
            className="p-2 rounded-3"
            style={{
              backgroundColor: 'rgba(0, 212, 255, 0.12)',
              border: '1px solid rgba(0, 212, 255, 0.35)',
            }}
          >
            <ShieldCheck size={30} className="text-info" />
          </div>
          <div>
            <h2 className="fw-bold mb-0">Panel de Administración</h2>
            <small className="text-secondary">
              TEOFOREVER COMPUTERS • Gestión de stock y productos
            </small>
          </div>
        </div>
      </div>

      <div className="row g-4 align-items-start">
        {/* Columna izquierda: Formulario */}
        <div className="col-lg-4">
          <div className="p-4" style={cajaEstilo}>
            <h5 className="fw-bold text-info mb-3 pb-2 border-bottom border-secondary">
              Cargar Nuevo Producto
            </h5>

            {mensajeExito && (
              <div className="alert alert-success py-2 small text-center">
                {mensajeExito}
              </div>
            )}

            <form onSubmit={handleAgregarProducto} className="d-flex flex-column gap-3">
              <div>
                <label className="form-label d-block small fw-semibold text-light mb-1">
                  Nombre del producto
                </label>
                <input
                  type="text"
                  required
                  value={nuevoProd.nombre}
                  onChange={(e) => setNuevoProd({ ...nuevoProd, nombre: e.target.value })}
                  style={{ ...campoEstilo, width: '100%' }}
                  placeholder="Ej: Placa de Video RTX 4060"
                />
              </div>

              <div>
                <label className="form-label d-block small fw-semibold text-light mb-1">
                  Categoría
                </label>
                <select
                  value={nuevoProd.categoria}
                  onChange={(e) => setNuevoProd({ ...nuevoProd, categoria: e.target.value })}
                  style={{ ...campoEstilo, width: '100%' }}
                >
                  <option value="notebooks">Notebooks</option>
                  <option value="procesadores">Procesadores</option>
                  <option value="placas-de-video">Placas de Video</option>
                  <option value="memorias-ram">Memorias RAM</option>
                  <option value="almacenamiento">Almacenamiento</option>
                  <option value="perifericos">Periféricos</option>
                </select>
              </div>

              <div className="row g-2">
                <div className="col-7">
                  <label className="form-label d-block small fw-semibold text-light mb-1">
                    Precio ($)
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={nuevoProd.precio}
                    onChange={(e) => setNuevoProd({ ...nuevoProd, precio: e.target.value })}
                    style={{ ...campoEstilo, width: '100%' }}
                    placeholder="450000"
                  />
                </div>
                <div className="col-5">
                  <label className="form-label d-block small fw-semibold text-light mb-1">
                    Stock inicial
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={nuevoProd.stock}
                    onChange={(e) => setNuevoProd({ ...nuevoProd, stock: e.target.value })}
                    style={{ ...campoEstilo, width: '100%' }}
                    placeholder="10"
                  />
                </div>
              </div>

              <div>
                <label className="form-label d-block small fw-semibold text-light mb-1">
                  Detalles del producto
                </label>
                <textarea
                  rows="3"
                  value={nuevoProd.detalles}
                  onChange={(e) => setNuevoProd({ ...nuevoProd, detalles: e.target.value })}
                  style={{ ...campoEstilo, width: '100%', resize: 'vertical' }}
                  placeholder="Ej: 8GB GDDR6, DLSS 3, ideal para 1080p en ultra y edición..."
                />
              </div>

              <div>
                <label className="form-label d-block small fw-semibold text-light mb-1">
                  URL de imagen (opcional)
                </label>
                <input
                  type="url"
                  value={nuevoProd.imagen}
                  onChange={(e) => setNuevoProd({ ...nuevoProd, imagen: e.target.value })}
                  style={{ ...campoEstilo, width: '100%' }}
                  placeholder="https://..."
                />
              </div>

              <div
                className="rounded-3 d-flex align-items-center justify-content-center overflow-hidden"
                style={{
                  height: '110px',
                  backgroundColor: '#0c0f17',
                  border: '1px dashed rgba(0, 212, 255, 0.3)',
                }}
              >
                {nuevoProd.imagen ? (
                  <img
                    src={nuevoProd.imagen}
                    alt="Vista previa"
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                ) : (
                  <div className="text-secondary small d-flex flex-column align-items-center gap-1">
                    <ImageIcon size={20} />
                    <span>Vista previa</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-info fw-bold text-dark w-100 py-2 mt-1 d-flex align-items-center justify-content-center gap-2"
                style={{ borderRadius: '8px' }}
              >
                <PlusCircle size={18} />
                <span>Agregar al Catálogo</span>
              </button>
            </form>
          </div>
        </div>

        {/* Columna derecha: Inventario */}
        <div className="col-lg-8">
          <div className="p-4" style={cajaEstilo}>
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 pb-3 mb-3 border-bottom border-secondary">
              <h5 className="fw-bold mb-0">
                Inventario Actual ({productosFiltrados.length})
              </h5>

              <div className="d-flex align-items-center gap-2" style={{ maxWidth: '250px', width: '100%' }}>
                <Search size={16} className="text-info flex-shrink-0" />
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  style={{ ...campoEstilo, padding: '6px 10px', width: '100%' }}
                  placeholder="Buscar..."
                />
              </div>
            </div>

            {cargando ? (
              <p className="text-secondary text-center py-4 mb-0">Cargando inventario...</p>
            ) : productosFiltrados.length === 0 ? (
              <p className="text-secondary text-center py-4 mb-0">No hay productos para mostrar.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-dark table-hover align-middle mb-0">
                  <thead>
                    <tr className="text-secondary small">
                      <th>Producto</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th className="text-center">Stock</th>
                      <th className="text-end">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosFiltrados.map((prod) => (
                      <tr key={prod.id}>
                        <td className="fw-semibold">{prod.nombre}</td>
                        <td>
                          <span className="badge bg-secondary text-uppercase">
                            {prod.categoria}
                          </span>
                        </td>
                        <td className="text-info fw-bold">
                          ${Number(prod.precio).toLocaleString('es-AR')}
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleCambiarStock(prod.id, prod.stock, -1)}
                              className="btn btn-outline-light btn-sm px-2"
                            >
                              <Minus size={13} />
                            </button>
                            <span
                              className={`badge px-2 py-1 ${
                                prod.stock === 0
                                  ? 'bg-danger'
                                  : prod.stock <= 3
                                  ? 'bg-warning text-dark'
                                  : 'bg-success'
                              }`}
                            >
                              {prod.stock}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCambiarStock(prod.id, prod.stock, 1)}
                              className="btn btn-outline-light btn-sm px-2"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </td>
                        <td className="text-end">
                          <button
                            type="button"
                            onClick={() => handleEliminarProducto(prod.id, prod.nombre)}
                            className="btn btn-outline-danger btn-sm"
                            title="Eliminar producto"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;