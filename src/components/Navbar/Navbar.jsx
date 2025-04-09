import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FaBlog, FaCalendarAlt, FaFilm, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/calendario');
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClickOutside);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const linkStyle = {
    color: '#f5f5f5',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1rem',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: '#111',
          padding: isMobile ? '1rem 1.5rem' : '1rem 2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: '1px solid #333',
          flexWrap: 'wrap',
          fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        }}
        ref={dropdownRef}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? '0.5rem' : '2rem',
            width: '100%',
          }}
        >
          <Link to="/" style={linkStyle}>Inicio</Link>

          <div
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              ...linkStyle,
              userSelect: 'none',
            }}
          >
            Proyectos
            <span
              style={{
                display: 'inline-block',
                transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }}
            >
              ▾
            </span>
          </div>
        </div>
      </nav>

      {showDropdown && (
        <div
          style={{
            width: '100%',
            backgroundColor: '#111',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: '1px solid #333',
            flexWrap: 'wrap',
            padding: '0.5rem 0',
            transition: 'all 0.3s ease',
          }}
        >
          <Link to="/blog" style={linkStyle}>
            <FaBlog /> BlogDinámico
          </Link>
          <Link to="/calendario" style={linkStyle}>
            <FaCalendarAlt /> Calendario
          </Link>
          <Link to="/biblioteca" style={linkStyle}>
            <FaFilm /> Biblioteca
          </Link>
          {user && location.pathname.startsWith('/calendario') && (
            <button
              onClick={handleLogout}
              style={{
                ...linkStyle,
                background: 'none',
                border: 'none',
                color: '#f55',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              <FaSignOutAlt /> Cerrar Sesión
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
