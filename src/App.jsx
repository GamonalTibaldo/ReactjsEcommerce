import { Routes, Route } from "react-router-dom";
import Layout from './Componentes/Layouts/Layout.jsx';
import Inicio from './Componentes/Inicio.jsx';
import QuienesSomos from './Componentes/QuienesSomos.jsx';
import Garantias from './Componentes/Garantias.jsx';
import PreguntasFrecuentes from './Componentes/PreguntasFrecuentes.jsx';
import MediosPago from './Componentes/MediosPago.jsx';
import ItemListContainer from './Componentes/Products/ItemListContainer.jsx';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/QuienesSomos" element={<QuienesSomos />} />
        <Route path="/Garantias" element={<Garantias />} />
        <Route path="/Preguntas-Frecuentes" element={<PreguntasFrecuentes />} />
        <Route path="/Medios-Pago" element={<MediosPago />} />
        <Route path="/Productos" element={<ItemListContainer />} />
      </Routes>
    </Layout>
  );
}

export default App;