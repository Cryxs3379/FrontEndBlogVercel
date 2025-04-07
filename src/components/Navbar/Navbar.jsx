import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/calendario'); // 🔄 Redirige a calendario
  };

  const linkStyle = (path) => ({
    color: location.pathname.startsWith(path) ? '#fff' : '#bbb',
    textDecoration: 'none',
    fontWeight: 'bold',
    margin: '0 1rem',
    fontSize: '1.1rem',
    transition: 'color 0.2s ease'
  });

  const isCalendar = location.pathname.startsWith('/calendario');

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

      {user && isCalendar && (
        <button 
          onClick={handleLogout}
          style={{
            marginLeft: '2rem',
            background: 'none',
            border: 'none',
            color: '#f55',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Cerrar Sesión
        </button>
      )}
    </nav>
  );
};

export default Navbar;
