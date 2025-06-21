import { useState, useEffect } from 'react';
import IdeaCard from '../components/IdeaCard';
import ideaService from '../services/ideaService';

const Ideas = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const data = await ideaService.getIdeas();
        setIdeas(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  const handleUpvote = (ideaId) => {
    setIdeas(ideas.map(idea => 
      idea._id === ideaId ? { ...idea, upvotes: idea.upvotes + 1 } : idea
    ));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Ideas</h1>
      {ideas.map(idea => (
        <IdeaCard key={idea._id} idea={idea} onUpvote={handleUpvote} />
      ))}
    </div>
  );
};

export default Ideas;