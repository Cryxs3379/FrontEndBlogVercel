import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: location.pathname.startsWith(path) ? '#fff' : '#bbb',
    textDecoration: 'none',
    fontWeight: 'bold',
    margin: '0 1rem',
    fontSize: '1.1rem',
    transition: 'color 0.2s ease'
  });

  return (
    <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#1a1a1a',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: '1px solid #333'
      }}>
      <Link to="/" style={linkStyle('/')}>Inicio</Link>
      <Link to="/blog" style={linkStyle('/blog')}>BlogDinámico</Link>
      <Link to="/calendario" style={linkStyle('/calendario')}>Calendario</Link>
      <Link to="/biblioteca" style={linkStyle('/biblioteca')}>Biblioteca</Link>
    </nav>
  );
};

export default Navbar;
