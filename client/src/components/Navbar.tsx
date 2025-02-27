import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth.context';

const styles: any = {
  nav: {
    width: '100vw',
    backgroundColor: 'var(--owgray)',
    color: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0',
    gap: '1rem',
  },
};

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={styles.nav}>
      <Link to="/">Home</Link>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
