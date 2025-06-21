import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import IdeaForm from '../components/IdeaForm';
import ideaService from '../services/ideaService';
import AuthContext from '../context/AuthContext';

const AddIdea = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (ideaData) => {
    try {
      const token = localStorage.getItem('token');
      await ideaService.createIdea(ideaData, token);
      navigate('/ideas');
    } catch (err) {
      setError('Failed to create idea');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Add New Idea</h1>
      {error && <div>{error}</div>}
      <IdeaForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddIdea;