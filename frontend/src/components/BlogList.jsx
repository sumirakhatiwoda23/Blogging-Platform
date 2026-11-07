import React, { useMemo, useState } from 'react'
import BlogCard from './BlogCard'
import { blogCategories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { getWords, scoreBlog } from '../utils/search'

const BlogList = () => {
    const [menu, setMenu] = useState('All')
    const { blogs, input, setInput } = useAppContext()

    const words = useMemo(() => getWords(input), [input])

    const filteredBlogs = useMemo(() => {
        const byCategory = blogs.filter((blog) => menu === 'All' || blog.category === menu)
        if (!words.length) return byCategory

        // keep blogs matching at least one word, best matches first
        return byCategory
            .map((blog) => ({ blog, score: scoreBlog(blog, words) }))
            .filter((item) => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .map((item) => item.blog)
    }, [blogs, menu, words])

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

            {/* Search status */}
            {words.length > 0 && (
                <div className='flex justify-center items-center gap-3 mb-6 text-sm text-gray-600'>
                    <p>
                        {filteredBlogs.length} result{filteredBlogs.length !== 1 && 's'} for "{input}"
                    </p>
                    <button
                        onClick={() => setInput('')}
                        className='text-primary underline cursor-pointer'
                    >
                        Clear
                    </button>
                </div>
            )}

            {/* Cards grid */}
            {filteredBlogs.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
                    {filteredBlogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} words={words} />
                    ))}
                </div>
            ) : (
                <p className='text-center text-gray-500 mb-24'>No blogs found.</p>
            )}
        </div>
    )
}

export default BlogList