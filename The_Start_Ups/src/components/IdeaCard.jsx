import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import ideaService from '../services/ideaService';

const IdeaCard = ({ idea, onUpvote }) => {
  const { isAuthenticated } = useContext(AuthContext);

  const handleUpvote = async () => {
    try {
      const token = localStorage.getItem('token');
      await ideaService.upvoteIdea(idea._id, token);
      onUpvote(idea._id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>{idea.title}</h3>
      <p>{idea.description}</p>
      <div>
        {idea.tags.map(tag => (
          <span key={tag}>#{tag} </span>
        ))}
      </div>
      <p>Category: {idea.category}</p>
      <p>Upvotes: {idea.upvotes}</p>
      {isAuthenticated && <button onClick={handleUpvote}>Upvote</button>}
    </div>
  );
};

export default IdeaCard;