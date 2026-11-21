import { Routes, Route } from "react-router-dom";
import Layout from './Componentes/Layouts/Layout.jsx';
import Inicio from './Componentes/Inicio.jsx';
import QuienesSomos from './Componentes/QuienesSomos.jsx';
import Garantias from './Componentes/Garantias.jsx';
import PreguntasFrecuentes from './Componentes/PreguntasFrecuentes.jsx';
import MediosPago from './Componentes/MediosPago.jsx';
import ItemListContainer from './Componentes/Productos/ItemListContainer.jsx';
import Carrito from './Componentes/Carrito.jsx';

import { CartProvider } from './Context/CartContext.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';
import Login from './Componentes/Login.jsx';
import AdminPanel from './Componentes/AdminPanel.jsx';
import Contacto from './Componentes/Contacto.jsx';



function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/QuienesSomos" element={<QuienesSomos />} />
            <Route path="/Garantias" element={<Garantias />} />
            <Route path="/Preguntas-Frecuentes" element={<PreguntasFrecuentes />} />
            <Route path="/Medios-Pago" element={<MediosPago />} />
            <Route path="/Productos" element={<ItemListContainer />} />
            <Route path="/categoria/:categoriaId" element={<ItemListContainer />} />
            <Route path="/Carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/Contacto" element={<Contacto />} />
            
          </Routes>
        </Layout>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;