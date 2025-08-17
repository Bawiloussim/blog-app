import { useEffect, useState } from 'react';
import { fetchBlog, updateBlog } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const EditBlog = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', content: '', author: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog(id).then(res => setForm(res.data));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await updateBlog(id, form);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Blog</h2>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Author"
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditBlog;