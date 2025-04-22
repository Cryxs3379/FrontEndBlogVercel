import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Biblioteca = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPeliculas = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('https://backendblogrender.onrender.com/api/peliculas');
        setPeliculas(data);
      } catch (err) {
        console.error('Error al cargar biblioteca:', err);
        setErrorMessage('No se pudo cargar la biblioteca.');
      } finally {
        setLoading(false);
      }
    };

    fetchPeliculas();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🎬 Biblioteca de Películas</h2>

      {errorMessage && <div style={styles.error}>{errorMessage}</div>}
      {loading ? (
        <p style={styles.loading}>Cargando películas...</p>
      ) : (
        <div style={styles.grid}>
          {peliculas.map((peli) => (
            <div key={peli._id} style={styles.card}>
              <img src={peli.imagen} alt={peli.nombre} style={styles.img} />
              <h3>{peli.nombre}</h3>
              <p><strong>Sinopsis:</strong> {peli.sinopsis}</p>
              <p><strong>Estreno:</strong> {new Date(peli.fecha_creacion).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '980px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#fff',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333',
    fontSize: '1.8rem',
  },
  error: {
    color: '#d9534f',
    marginBottom: '1rem',
    fontSize: '1rem',
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    color: '#555',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fdfdfd',
  },
  img: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
    marginBottom: '0.8rem',
  },
};

export default Biblioteca;
