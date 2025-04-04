import { Routes, Route, useLocation } from 'react-router-dom';
import BlogDinamico from './components/BlogDinamico/BlogDinamico';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

export default function App() {
  const location = useLocation();
  const esInicio = location.pathname === '/';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f9f9f9',
      width: '100%',
      overflowX: 'hidden'
    }}>
      {/* ✅ Navbar siempre visible */}
      <Navbar />

      {/* ✅ Header solo visible en / */}
      {esInicio && (
        <header style={{
          backgroundColor: '#1a1a1a',
          padding: '2rem 1rem',
          textAlign: 'center',
          width: '100%'
        }}>
          <h1 style={{ color: '#fff', fontSize: '2.5rem', margin: 0 }}>
            💼 Portafolio - Pablo
          </h1>
          <p style={{ color: '#bbb', marginTop: '0.5rem' }}>
            Bienvenido a mi sitio personal y profesional
          </p>
        </header>
      )}

      <main style={{
        flex: 1,
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/*" element={<BlogDinamico />} />
        </Routes>
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '1rem',
        backgroundColor: '#1a1a1a',
        color: '#999',
        width: '100%'
      }}>
        © 2025 Pablo | Todos los derechos reservados
      </footer>
    </div>
  );
}
