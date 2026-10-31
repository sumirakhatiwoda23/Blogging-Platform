import React from 'react'
import { useNavigate } from 'react-router-dom'

// props is passed from the BlogList
const BlogCard = ({ blog }) => {
    const { _id, title, subTitle, category, image } = blog
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(`/blog/${_id}`)}
            className='w-full rounded-lg overflow-hidden shadow bg-white hover:scale-[1.02] hover:shadow-primary/25 duration-300 cursor-pointer'
        >
            <img
                src={image}
                alt={title}
                className='aspect-video w-full object-cover'
            />
            <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 text-primary rounded-full text-xs'>
                {category}
            </span>
            <div className='p-5'>
                <h5 className='mb-2 font-medium text-gray-900'>{title}</h5>
                <p className='mb-3 text-xs text-gray-600 line-clamp-2'>
                    {subTitle?.trim()}
                </p>
            </div>
        </div>
    )
}

export default BlogCard
