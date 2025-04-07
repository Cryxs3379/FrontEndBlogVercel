import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user)); // Guardar en localStorage
      onLogin(user); // Informar al componente padre
    } catch (error) {
      alert('Credenciales inválidas');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Iniciar Sesión</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <input 
        type="password" 
        placeholder="Contraseña" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button type="submit" style={{ width: '100%', padding: '0.5rem' }}>Login</button>
    </form>
  );
};

export default Login;
