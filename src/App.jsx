import { Routes, Route } from 'react-router-dom';
import Articulos from './components/Articulos';
import ArticuloDetalle from './components/ArticuloDetalle';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9f9f9' }}>
      <header style={{ backgroundColor: '#1a1a1a', padding: '2rem 0', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '2.5rem', margin: 0 }}>
          📰 BlogDinámico
        </h1>
        <p style={{ color: '#bbb', marginTop: '0.5rem' }}>Explora artículos sobre tecnología, ciencia y más.</p>
      </header>

      <main style={{ flex: 1, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Articulos />} />
          <Route path="/articulo/:id" element={<ArticuloDetalle />} />
        </Routes>
      </main>

      <footer style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#1a1a1a', color: '#999' }}>
        © 2025 BlogDinámico - Todos los derechos reservados
      </footer>
    </div>
  );
}
