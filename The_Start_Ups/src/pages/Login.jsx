import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success('Login successful!');
      navigate('/ideas');
    } catch (err) {
      console.error('Login error:', err);
      throw err; // This will be caught by AuthForm
    }
  };

  return (
    <AuthForm 
      type="login" 
      onSubmit={handleSubmit} 
    />
  );
};

export default Login;