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
    <section>
      <input
        type="text"
        placeholder="Buscar artículos..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        style={{
          padding: '12px',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          width: '100%',
          maxWidth: '400px',
          marginBottom: '2rem',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        {filtrados.map(articulo => (
          <div
            key={articulo._id}
            onClick={() => navigate(`/articulo/${articulo._id}`)}
            style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '12px',
              width: '100%',
              maxWidth: '340px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <h3 style={{ marginBottom: '0.5rem', color: '#1a1a1a' }}>{articulo.titulo}</h3>
            <p style={{ color: '#555', fontSize: '0.95rem' }}>{articulo.introduccion}</p>
            <span style={{ fontSize: '0.8rem', color: '#999' }}>
              {new Date(articulo.fecha).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

      {filtrados.length === 0 && <p style={{ textAlign: 'center', marginTop: '2rem', color: '#777' }}>No se encontraron artículos.</p>}
    </section>
  );
}
