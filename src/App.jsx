import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import BlogDinamico from './components/BlogDinamico/BlogDinamico';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Auth/Login';
import Calendario from './components/Calendar/Calendar';

export default function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Determinar si estamos en la ruta raíz
  const esInicio = location.pathname === '/';

  // Recuperar sesión al cargar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: esInicio ? '#111' : '#f9f9f9', // 🎯 cambia según la ruta
      width: '100%',
      overflowX: 'hidden',
    }}>
      <Navbar user={user} setUser={setUser} />

      <main style={{
        flex: 1,
        width: '100%',
        padding: 0,
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/*" element={<BlogDinamico />} />
          <Route 
            path="/calendario" 
            element={
              user ? (
                <Calendario user={user} />
              ) : (
                <Login onLogin={(u) => {
                  setUser(u);
                  localStorage.setItem('user', JSON.stringify(u));
                }} />
              )
            } 
          />
        </Routes>
      </main>
    </div>
  );
}
