// src/components/ArticuloDetalle.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ArticuloDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [articulo, setArticulo] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/articulos`)
      .then(res => {
        const encontrado = res.data.find(a => a._id === id);
        setArticulo(encontrado);
      })
      .catch(err => console.error('Error al obtener el artículo:', err));
  }, [id]);

  if (!articulo) return <p style={{ padding: '2rem' }}>Cargando artículo...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>← Volver</button>
      <h2>{articulo.titulo}</h2>
      <p style={{ fontStyle: 'italic', color: '#666' }}>
        ✍️ {articulo.autor} | 📅 {new Date(articulo.fecha).toLocaleDateString()}
      </p>
      <p>{articulo.contenido}</p>
      {articulo.imagenes?.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          {articulo.imagenes.map((url, i) => (
            <img key={i} src={url} alt={`Imagen ${i}`} style={{ maxWidth: '100%', marginBottom: '1rem' }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticuloDetalle;
