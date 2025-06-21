import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/ideas">Ideas</Link>
      {isAuthenticated ? (
        <>
          <Link to="/add-idea">Add Idea</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;