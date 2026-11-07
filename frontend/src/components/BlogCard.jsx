import React from 'react'
import { useNavigate } from 'react-router-dom'
import { stripHtml, getSnippet } from '../utils/search'
import Highlight from './HighLight'

const BlogCard = ({ blog, words = [] }) => {
    const { _id, title, subTitle, description, category, image } = blog
    const navigate = useNavigate()

    // only built while searching: a piece of the description with the matching word
    const snippet = words.length ? getSnippet(stripHtml(description), words) : ''

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
                <Highlight text={category} words={words} />
            </span>
            <div className='p-5'>
                <h5 className='mb-2 font-medium text-gray-900'>
                    <Highlight text={title} words={words} />
                </h5>
                <p className='mb-3 text-xs text-gray-600 line-clamp-2'>
                    <Highlight text={subTitle?.trim()} words={words} />
                </p>
                {snippet && (
                    <p className='mb-3 text-xs text-gray-500 line-clamp-3'>
                        <Highlight text={snippet} words={words} />
                    </p>
                )}
            </div>
        </div>
    )
}

export default BlogCard