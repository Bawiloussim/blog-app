import express from 'express';
import multer from 'multer';
import {
  getBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.get('/', getBlogs);
router.post('/', upload.single('image'), createBlog); 
router.get('/:id', getBlogById);
router.put('/:id', upload.single('image'), updateBlog);
router.delete('/:id', deleteBlog);

export default router;