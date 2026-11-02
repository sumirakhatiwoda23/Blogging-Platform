import imagekit from '../configs/imagekit.js'
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'
import fs from 'fs'

// POST /api/blog/add   (form-data: blog = JSON string, image = file)
export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog)
        const imageFile = req.file

        if (!title || !description || !category || !imageFile) {
            return res.json({ success: false, message: 'Missing required fields' })
        }

        // upload the original image to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs',
        })

        // delete the temp file saved by multer
        fs.unlinkSync(imageFile.path)

        // optimized URL: auto format, smaller width
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [{ quality: 'auto' }, { format: 'webp' }, { width: '1280' }],
        })
        const image = optimizedImageUrl;
        await Blog.create({ title, subTitle, description, category, image, isPublished })
        res.json({ success: true, message: 'Blog added successfully' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// GET /api/blog/all   (public: published blogs only)
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 })
        res.json({ success: true, blogs })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// GET /api/blog/:blogId
export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params
        const blog = await Blog.findById(blogId)

        if (!blog) {
            return res.json({ success: false, message: 'Blog not found' })
        }
        res.json({ success: true, blog })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// POST /api/blog/delete   body: { id }
export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body
        await Blog.findByIdAndDelete(id)

        // remove the blog's comments too, so none are left without a blog
        await Comment.deleteMany({ blog: id })

        res.json({ success: true, message: 'Blog deleted successfully' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// POST /api/blog/toggle-publish   body: { id }
export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body
        const blog = await Blog.findById(id)

        if (!blog) {
            return res.json({ success: false, message: 'Blog not found' })
        }

        blog.isPublished = !blog.isPublished
        await blog.save()
        res.json({ success: true, message: 'Blog status updated' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// POST /api/blog/add-comment   body: { blog, name, content }
export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body
        await Comment.create({ blog, name, content })
        res.json({ success: true, message: 'Comment added for review' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// POST /api/blog/comments   body: { blogId }   (approved comments only)
export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 })
        res.json({ success: true, comments })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// POST /api/blog/generate   body: { title }
export const generateContent = async (req, res) => {
    try {
        const { title } = req.body
        if (!title) {
            return res.json({ success: false, message: 'Title is required' })
        }

        const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.XAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: process.env.XAI_MODEL,
                messages: [
                    {
                        role: 'system',
                        content:
                            'You write blog posts. Reply with HTML only, using <h2>, <p>, <ol>, <li> and <strong>. No markdown, no code fences, no <html> or <body> tags.',
                    },
                    { role: 'user', content: `Write a short blog post titled: ${title}` },
                ],
            }),
        })

        const data = await response.json()
        if (!response.ok) {
            return res.json({ success: false, message: data.error?.message || 'AI request failed' })
        }

        res.json({ success: true, content: data.choices[0].message.content })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}