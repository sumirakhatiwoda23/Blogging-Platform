import React from 'react'
import toast from 'react-hot-toast'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'

const BlogTableItem = ({ blog, index, fetchBlogs }) => {
    const { axios, fetchBlogs: refreshPublicBlogs } = useAppContext()
    const { title, createdAt, isPublished } = blog
    const blogDate = new Date(createdAt)

    const togglePublish = async () => {
        try {
            const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id })
            if (data.success) {
                toast.success(data.message)
                await fetchBlogs()
                refreshPublicBlogs()   // keep the home page list in sync
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const deleteBlog = async () => {
        if (!window.confirm('Delete this blog?')) return
        try {
            const { data } = await axios.post('/api/blog/delete', { id: blog._id })
            if (data.success) {
                toast.success(data.message)
                await fetchBlogs()
                refreshPublicBlogs()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <tr className='border-y border-gray-300'>
            <th className='px-2 py-4'>{index}</th>
            <td className='px-2 py-4'>{title}</td>
            <td className='px-2 py-4 max-sm:hidden'>{blogDate.toDateString()}</td>
            <td className='px-2 py-4 max-sm:hidden'>
                <p className={isPublished ? 'text-green-600' : 'text-orange-700'}>
                    {isPublished ? 'Published' : 'Unpublished'}
                </p>
            </td>
            <td className='px-2 py-4 flex text-xs gap-3'>
                <button
                    onClick={togglePublish}
                    className='border px-2 py-0.5 mt-1 rounded cursor-pointer'
                >
                    {isPublished ? 'Unpublish' : 'Publish'}
                </button>
                <img
                    src={assets.cross_icon}
                    alt='delete'
                    onClick={deleteBlog}
                    className='w-8 hover:scale-110 transition-all cursor-pointer'
                />
            </td>
        </tr>
    )
}

export default BlogTableItem