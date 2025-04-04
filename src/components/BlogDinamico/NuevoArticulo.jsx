import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NuevoArticulo() {
  const [form, setForm] = useState({
    titulo: '',
    introduccion: '',
    contenido: '',
    autor: '',
    imagenes: []
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'imagenes'
        ? value.split(',').map(img => img.trim())
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/articulos`, form);
      alert('✅ Artículo publicado');
      navigate('/blog');
    } catch (err) {
      alert('❌ Error al publicar el artículo');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>📝 Crear nuevo artículo</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="introduccion"
          placeholder="Introducción"
          value={form.introduccion}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <textarea
          name="contenido"
          placeholder="Contenido"
          value={form.contenido}
          onChange={handleChange}
          required
          style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
        />
        <input
          type="text"
          name="autor"
          placeholder="Autor"
          value={form.autor}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="imagenes"
          placeholder="URLs de imágenes (separadas por coma)"
          onChange={handleChange}
          style={inputStyle}
        />
        <button
          type="submit"
          style={{
            background: 'crimson',
            color: '#fff',
            border: 'none',
            padding: '12px',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#b80030'}
          onMouseLeave={e => e.currentTarget.style.background = 'crimson'}
        >
          🚀 Publicar
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};
