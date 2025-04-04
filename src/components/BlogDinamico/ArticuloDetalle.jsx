import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ArticuloDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [articulo, setArticulo] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [credenciales, setCredenciales] = useState({ user: '', pass: '' });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/articulos`)
      .then(res => {
        const encontrado = res.data.find(a => a._id === id);
        setArticulo(encontrado);
      })
      .catch(err => console.error('Error al obtener el artículo:', err));
  }, [id]);

  const handleEliminar = async () => {
    if (credenciales.user === 'admin' && credenciales.pass === 'admin') {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/articulos/${id}`);
        alert('Artículo eliminado');
        navigate('/blog');
      } catch (err) {
        alert('Error al eliminar el artículo');
      }
    } else {
      alert('Credenciales incorrectas');
    }
  };

  if (!articulo) return <p style={{ padding: '2rem' }}>Cargando artículo...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
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

      {/* Botones de acción */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginTop: '2rem'
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'crimson',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          ← Volver
        </button>

        {!mostrarLogin ? (
          <button
            onClick={() => setMostrarLogin(true)}
            style={{
              background: 'crimson',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            🗑️ Eliminar
          </button>
        ) : (
          <div style={{
            background: '#fff',
            border: '1px solid #ccc',
            padding: '1rem',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <input
              type="text"
              placeholder="Usuario"
              value={credenciales.user}
              onChange={(e) => setCredenciales({ ...credenciales, user: e.target.value })}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={credenciales.pass}
              onChange={(e) => setCredenciales({ ...credenciales, pass: e.target.value })}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button
              onClick={handleEliminar}
              style={{
                background: 'crimson',
                color: '#fff',
                border: 'none',
                padding: '8px',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}
            >
              Confirmar eliminación
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticuloDetalle;
