// ideaService.js
import axios from 'axios';

const API_URL = '/api/ideas';

const getIdeas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createIdea = async (ideaData, token) => {
  const config = {
    headers: {
      'x-auth-token': token
    }
  };
  const response = await axios.post(API_URL, ideaData, config);
  return response.data;
};

const upvoteIdea = async (ideaId, token) => {
  const config = {
    headers: {
      'x-auth-token': token
    }
  };
  const response = await axios.put(`${API_URL}/${ideaId}/upvote`, {}, config);
  return response.data;
};

export default { getIdeas, createIdea,upvoteIdea};