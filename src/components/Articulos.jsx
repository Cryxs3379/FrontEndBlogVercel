// src/components/Articulos.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Articulos() {
  const [articulos, setArticulos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/articulos`)
      .then(res => setArticulos(res.data))
      .catch(err => console.error('Error al cargar artículos:', err));
  }, []);

  const filtrados = articulos.filter(a =>
    `${a.titulo} ${a.introduccion} ${a.contenido}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem' }}>
      <input
        type="text"
        placeholder="Buscar artículos..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '1rem',
          borderRadius: '6px',
          border: '1px solid #ccc',
          width: '100%',
          maxWidth: '400px',
          marginBottom: '2rem',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {filtrados.map(articulo => (
          <div
            key={articulo._id}
            onClick={() => navigate(`/articulo/${articulo._id}`)}
            style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '10px',
              width: '300px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}
          >
            <h3>{articulo.titulo}</h3>
            <p>{articulo.introduccion}</p>
            <span style={{ fontSize: '0.8rem', color: '#999' }}>
              {new Date(articulo.fecha).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

      {filtrados.length === 0 && <p style={{ textAlign: 'center', marginTop: '2rem', color: '#666' }}>No se encontraron artículos.</p>}
    </div>
  );
}
