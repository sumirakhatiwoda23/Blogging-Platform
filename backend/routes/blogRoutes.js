import express from 'express'
import {
    addBlog,
    getAllBlogs,
    getBlogById,
    deleteBlogById,
    togglePublish,
    addComment,
    getBlogComments,
    generateContent,
} from '../controllers/blogController.js'
import upload from '../middleware/multer.js'
import auth from '../middleware/auth.js'

const blogRouter = express.Router()

// admin (token required)
blogRouter.post('/add', auth, upload.single('image'), addBlog)
blogRouter.post('/delete', auth, deleteBlogById)
blogRouter.post('/toggle-publish', auth, togglePublish)
blogRouter.post('/generate', auth, generateContent)

// public
blogRouter.get('/all', getAllBlogs)
blogRouter.post('/add-comment', addComment)
blogRouter.post('/comments', getBlogComments)

// keep this last: it matches any /api/blog/<something>
blogRouter.get('/:blogId', getBlogById)

export default blogRouter