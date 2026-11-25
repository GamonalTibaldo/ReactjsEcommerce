import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext.jsx';

const RutaProtegida = ({ children, rolRequerido }) => {
  const { usuario } = useAuth();
  const location = useLocation();

  // Sin sesión iniciada -> mandamos a /login guardando desde dónde venía
  if (!usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si exige un rol (por ejemplo "admin") y el usuario no lo cumple -> redirigimos
  if (rolRequerido && usuario.rol !== rolRequerido) {
    return <Navigate to="/Productos" replace />;
  }

  return children;
};

export default RutaProtegida;
