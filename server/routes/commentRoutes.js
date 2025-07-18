import express from 'express';
import {
  createComment,
  getCommentsByBlog,
  deleteComment,
  updateComment
} from '../controllers/commentController.js';

const router = express.Router();

router.post('/', createComment);
router.get('/:blogId', getCommentsByBlog);
router.delete('/:id', deleteComment);
router.put('/:id', updateComment); // ✅ new
export default router;
