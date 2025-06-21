import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to IdeaHub</h1>
      <p>A platform for ideas worth building</p>
      {!isAuthenticated && (
        <div>
          <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to get started
        </div>
      )}
    </div>
  );
};

export default Home;