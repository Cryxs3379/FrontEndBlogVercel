import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import BlogDinamico from './components/BlogDinamico/BlogDinamico';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Auth/Login';
import Calendario from './components/Calendar/Calendar';
import Biblioteca from './components/Biblioteca/Biblioteca';

// ✅ Corrección: import correcto del componente
import LibraryLogin from './components/Auth/LibraryLogin';
import BibliotecaHome from './components/Biblioteca/BibliotecaHome';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null); // usuario calendario
  const [bibliotecaUser, setBibliotecaUser] = useState(null); // usuario biblioteca

  const esInicio = location.pathname === '/';

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedBibliotecaUser = localStorage.getItem('bibliotecaUser');
    if (savedBibliotecaUser) setBibliotecaUser(JSON.parse(savedBibliotecaUser));
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: esInicio ? '#111' : '#f9f9f9',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <Navbar
  user={user || bibliotecaUser}
  setUser={user ? setUser : setBibliotecaUser}
/>


      <main style={{ flex: 1, width: '100%', padding: 0 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/*" element={<BlogDinamico />} />
          
          {/* Login calendario */}
          <Route
  path="/calendario"
  element={
    user ? (
      <Calendario user={user} setUser={setUser} />
    ) : (
      <Login
        onLogin={(u) => {
          setUser(u);
          localStorage.setItem('user', JSON.stringify(u));
          navigate('/calendario');
        }}
      />
    )
  }
/>


          {/* Login biblioteca */}
          <Route
            path="/login-biblioteca"
            element={
              <LibraryLogin
                onLogin={(u) => {
                  setBibliotecaUser(u);
                  localStorage.setItem('bibliotecaUser', JSON.stringify(u));
                  navigate('/biblioteca');
                }}
              />
            }
          />

          {/* Vista protegida de biblioteca */}
          <Route
  path="/biblioteca"
  element={
    bibliotecaUser ? (
      <Biblioteca
        bibliotecaUser={bibliotecaUser}
        setBibliotecaUser={setBibliotecaUser}
      />
    ) : (
      <LibraryLogin
        onLogin={(u) => {
          setBibliotecaUser(u);
          localStorage.setItem('bibliotecaUser', JSON.stringify(u));
          navigate('/biblioteca');
        }}
      />
    )
  }
/>

        </Routes>
      </main>
    </div>
  );
}
