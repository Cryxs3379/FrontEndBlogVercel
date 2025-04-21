import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Biblioteca.css';

const Biblioteca = () => {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:10000/api/peliculas')
      .then(res => setPeliculas(res.data))
      .catch(err => console.error('Error al cargar biblioteca:', err));
  }, []);

  return (
    <div className="biblioteca-grid">
      {peliculas.map(peli => (
        <div key={peli._id} className="biblioteca-card">
          <img src={peli.imagen} alt={peli.nombre} className="biblioteca-img" />
          <h2>{peli.nombre}</h2>
          <p><strong>Sinopsis:</strong> {peli.sinopsis}</p>
          <p><strong>Fecha de estreno:</strong> {new Date(peli.fecha_creacion).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Biblioteca;
