import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'

const ListBlog = () => {
    const { axios } = useAppContext()
    const [blogs, setBlogs] = useState([])

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/admin/blogs')
            data.success ? setBlogs(data.blogs) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 overflow-y-auto'>
            <h1>All blogs</h1>

            <div className='relative max-w-4xl mt-4 overflow-x-auto shadow rounded-lg bg-white'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-xs text-gray-600 text-left uppercase'>
                        <tr>
                            <th className='px-2 py-4 xl:px-6'>#</th>
                            <th className='px-2 py-4'>Blog Title</th>
                            <th className='px-2 py-4 max-sm:hidden'>Date</th>
                            <th className='px-2 py-4 max-sm:hidden'>Status</th>
                            <th className='px-2 py-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog, index) => (
                            <BlogTableItem
                                key={blog._id}
                                blog={blog}
                                index={index + 1}
                                fetchBlogs={fetchBlogs}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListBlog