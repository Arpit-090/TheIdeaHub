import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const Register = () => {
  const { register: registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await registerUser(data.username, data.email, data.password);
      toast.success('Registration successful!');
      navigate('/ideas');
    } catch (err) {
      console.error('Registration error:', err);
      throw err; // This will be caught by AuthForm
    }
  };

  return (
    <AuthForm 
      type="register" 
      onSubmit={handleSubmit} 
    />
  );
};

export default Register;