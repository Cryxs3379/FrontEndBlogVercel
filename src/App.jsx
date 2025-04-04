// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Articulos from './components/Articulos';
import ArticuloDetalle from './components/ArticuloDetalle';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Articulos />} />
      <Route path="/articulo/:id" element={<ArticuloDetalle />} />
    </Routes>
  );
}
