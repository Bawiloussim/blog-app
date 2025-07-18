import Comment from '../models/Comment.js';

export const createComment = async (req, res) => {
  try {
    const { blogId, author, text } = req.body;
    const comment = new Comment({ blogId, author, text });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: 'Failed to post comment' });
  }
};

export const getCommentsByBlog = async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    comment.text = text;
    await comment.save();

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Error updating comment' });
  }
};
