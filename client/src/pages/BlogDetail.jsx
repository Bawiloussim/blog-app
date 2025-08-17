import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error('Failed to fetch blog:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/comments/${id}`);
        setComments(res.data);
      } catch (err) {
        console.error('Failed to fetch comments:', err);
      }
    };

    fetchBlog();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const author = localStorage.getItem('username') || 'Anonymous';
      const res = await axios.post('http://localhost:5000/api/comments', {
        blogId: id,
        author,
        text: newComment,
      });
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to post comment:', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`);
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  const handleEditSubmit = async (e, commentId) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/comments/${commentId}`, {
        text: editedText,
      });
      setComments(
        comments.map((comment) =>
          comment._id === commentId ? res.data : comment
        )
      );
      setEditingCommentId(null);
      setEditedText('');
    } catch (err) {
      console.error('Failed to update comment:', err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (!blog) return <p className="text-center mt-10 text-red-500">Blog not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
      {blog.image && (
        <img
          src={`http://localhost:5000${blog.image}`}
          alt="Blog cover"
          onError={(e) => (e.target.src = '/default-image.jpg')}
          className="w-full h-72 object-cover rounded mb-6"
        />
      )}
      <h1 className="text-3xl font-bold text-blue-700 mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-4">By {blog.author}</p>
      <p className="text-gray-800 whitespace-pre-line mb-6">{blog.content}</p>

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full border p-2 rounded mb-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Comment
        </button>
      </form>

      {/* Comment List */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="border-t py-2 flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">
                  <strong>{comment.author}</strong> ·{' '}
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
                {editingCommentId === comment._id ? (
                  <form onSubmit={(e) => handleEditSubmit(e, comment._id)} className="mt-2 space-y-2">
                    <textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      placeholder="Update your comment..."
                      className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      required
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingCommentId(null)}
                        className="bg-gray-300 text-gray-700 px-3 py-1 text-sm rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className="text-gray-800 whitespace-pre-line">{comment.text}</p>
                )}
              </div>
              {!editingCommentId && (
                <div className="flex flex-col gap-1 ml-4">
                  <button
                    onClick={() => {
                      setEditingCommentId(comment._id);
                      setEditedText(comment.text);
                    }}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-6">
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
