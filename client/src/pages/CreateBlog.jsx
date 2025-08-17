import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Blog created!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create blog');
    }
  };

  // form 
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Create a New Blog</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 rounded h-40"
        required
      />

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border p-2 rounded bg-white"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Blog
      </button>
    </form>
  );
};

export default CreateBlog;