import { Routes, Route } from 'react-router-dom';
import Articulos from './Articulos';
import ArticuloDetalle from './ArticuloDetalle';
import NuevoArticulo from './NuevoArticulo';

const BlogDinamico = () => {
  return (
    <Routes>
      <Route path="/" element={<Articulos />} />
      <Route path="/articulo/:id" element={<ArticuloDetalle />} />
      <Route path="/nuevo" element={<NuevoArticulo />} />
    </Routes>
  );
};

export default BlogDinamico;
