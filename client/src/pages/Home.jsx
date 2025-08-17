import { useEffect, useState } from 'react';
import { fetchBlogs, deleteBlog } from '../services/api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs().then(res => setBlogs(res.data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter(blog => blog._id !== id));
      toast.success('Hey! Blog deleted successfully!');
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Failed to delete blog.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600">Blog Posts Created</h1>
        <Link
          to="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Create New
        </Link>
      </div>

      {blogs.length === 0 ? (
        <p className="text-gray-500">No blog posts yet.</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-md rounded p-6 mb-6 border border-gray-200"
          >
            {blog.image && (
              <Link to={`/blog/${blog._id}`}>
                <img
                  src={`http://localhost:5000${blog.image}`}
                  alt="Blog cover"
                  className="w-full h-64 object-cover rounded mb-4"
                />
              </Link>
            )}
            <Link to={`/blog/${blog._id}`}>
              <h2 className="text-3xl font-extrabold text-blue-900 hover:text-blue-700 mb-2">
                {blog.title}
              </h2>
            </Link>
            <p className="text-gray-500 italic mb-4">By {blog.author}</p>
            <p className="text-gray-800">
              {blog.content.length > 200
                ? blog.content.slice(0, 200) + '...'
                : blog.content}
            </p>
            <div className="flex gap-4 mt-6">
              <Link
                to={`/edit/${blog._id}`}
                className="text-blue-600 hover:underline font-semibold"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(blog._id)}
                className="text-red-600 hover:underline font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
