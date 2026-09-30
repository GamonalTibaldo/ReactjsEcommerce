import { Routes, Route } from "react-router-dom";
import Layout from './Componentes/Layouts/Layout.jsx';
import Inicio from './Componentes/Inicio.jsx';
import QuienesSomos from './Componentes/QuienesSomos.jsx';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/QuienesSomos" element={<QuienesSomos />} />
      </Routes>
    </Layout>
  );
}

export default App;