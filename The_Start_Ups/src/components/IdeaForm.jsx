import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ideaService from '../services/ideaService';

const IdeaForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const submitForm = (data) => {
    onSubmit({ ...data, tags });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div>
        <label>Title</label>
        <input {...register('title', { required: 'Title is required' })} />
        {errors.title && <span>{errors.title.message}</span>}
      </div>
      
      <div>
        <label>Description</label>
        <textarea {...register('description', { required: 'Description is required' })} />
        {errors.description && <span>{errors.description.message}</span>}
      </div>
      
      <div>
        <label>Tags</label>
        <div>
          {tags.map(tag => (
            <div key={tag}>
              #{tag}
              <button type="button" onClick={() => removeTag(tag)}>x</button>
            </div>
          ))}
        </div>
        <input 
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
        />
        <button type="button" onClick={addTag}>Add Tag</button>
      </div>
      
      <div>
        <label>Category</label>
        <select {...register('category', { required: 'Category is required' })}>
          <option value="">Select a category</option>
          <option value="Software">Software</option>
          <option value="Hardware">Hardware</option>
          <option value="Food">Food</option>
          <option value="Nonprofit">Nonprofit</option>
          <option value="Other">Other</option>
        </select>
        {errors.category && <span>{errors.category.message}</span>}
      </div>
      
      <button type="submit">Submit Idea</button>
    </form>
  );
};

export default IdeaForm;