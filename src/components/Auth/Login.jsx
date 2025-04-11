import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('https://backendblogrender.onrender.com/auth/login', {
        email: form.email.trim(),
        password: form.password,
      });

      if (data?.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
      } else {
        throw new Error('Respuesta inesperada del servidor.');
      }
    } catch (err) {
      setErrorMessage('Credenciales inválidas o error del servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Iniciar Sesión</h2>

        {errorMessage && <div style={styles.error}>{errorMessage}</div>}

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
      </form>

      {/* Info visual del calendario */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>🗓️ ¿Qué puedes hacer en el calendario?</h3>
        <ul style={styles.cardList}>
          <li><strong>Crear eventos:</strong> Añade tus notas o tareas con título, descripción y duración.</li>
          <li><strong>Editar eventos:</strong> Cambia detalles de cualquier evento que hayas creado.</li>
          <li><strong>Eliminar eventos:</strong> Borra eventos fácilmente, con confirmación de seguridad.</li>
          <li><strong>Mover eventos:</strong> Usa drag & drop para reprogramar tareas en el calendario.</li>
          <li><strong>Ver historial:</strong> Consulta quién hizo qué cambios y cuándo se realizaron.</li>
        </ul>
        <p style={styles.cardNote}>
          Todo está conectado a una API segura y tus datos quedan guardados para que puedas consultarlos más tarde.
        </p>
      </div>

      {/* Accesos de prueba */}
      <div style={styles.usersBox}>
        <h4 style={styles.cardTitle}>🔑 Accesos de prueba</h4>
        <ul style={styles.cardList}>
          <li><strong>Admin:</strong> pedro@gmail.com / 123456</li>
          <li><strong>Editor:</strong> jose@example.com / 456789</li>
          <li><strong>Viewer:</strong> niki@example.com / 123456</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '520px',
    margin: '2rem auto',
    padding: '2.5rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
    fontSize: '1.8rem',
  },
  input: {
    padding: '0.85rem',
    marginBottom: '1.2rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1.05rem',
  },
  button: {
    padding: '0.85rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.05rem',
    cursor: 'pointer',
  },
  error: {
    color: '#d9534f',
    marginBottom: '1rem',
    fontSize: '0.95rem',
    textAlign: 'center',
  },
  card: {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  cardTitle: {
    color: '#2c3e50',
    marginBottom: '1rem',
    fontSize: '1.4rem',
  },
  cardList: {
    lineHeight: '1.7',
    paddingLeft: '1.2rem',
    fontSize: '1rem',
    color: '#444',
  },
  cardNote: {
    marginTop: '1rem',
    fontSize: '0.95rem',
    color: '#777',
  },
  usersBox: {
    marginTop: '1.5rem',
    padding: '1.2rem',
    backgroundColor: '#f4f4f4',
    border: '1px dashed #aaa',
    borderRadius: '6px',
  },
};

export default Login;
