import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const Biblioteca = ({ bibliotecaUser, setBibliotecaUser }) => {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('bibliotecaUser');
    setBibliotecaUser(null);
    navigate('/login-biblioteca');
  };

  return (
    <div style={styles.container}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: '2rem',
      }}>
        <h2 style={styles.heading}>
          🎬 Biblioteca de Películas<br />
          <span style={{ fontSize: '1rem', color: '#555' }}>
            👋 Bienvenido, {bibliotecaUser?.nombre} {bibliotecaUser?.apellido}
          </span>
        </h2>
        <button
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '0.95rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            height: 'fit-content'
          }}
        >
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </div>

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
    margin: 0,
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
