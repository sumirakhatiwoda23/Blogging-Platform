import React, { useState } from 'react'
import BlogCard from './BlogCard'
import { blog_data, blogCategories } from '../assets/assets'

const BlogList = ({ search = '' }) => {
    const [menu, setMenu] = useState('All')

    const filteredBlogs = blog_data
        .filter((blog) => menu === 'All' || blog.category === menu)
        .filter((blog) => {
            const q = search.toLowerCase()
            return (
                blog.title.toLowerCase().includes(q) ||
                blog.category.toLowerCase().includes(q)
            )
        })

    return (
        <div>
            {/* Category pills */}
            <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
                {blogCategories.map((item) => (
                    <button
                        key={item}
                        onClick={() => setMenu(item)}
                        className={`relative px-4 py-1 text-sm rounded-full cursor-pointer transition-all ${
                            menu === item
                                ? 'bg-primary text-white'
                                : 'text-gray-600 hover:text-primary'
                        }`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* Cards grid */}
            {filteredBlogs.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
                    {filteredBlogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            ) : (
                <p className='text-center text-gray-500 mb-24'>No blogs found.</p>
            )}
        </div>
    )
}

export default BlogList
