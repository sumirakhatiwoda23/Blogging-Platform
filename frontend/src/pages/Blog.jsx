import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { assets, blog_data, comments_data } from '../assets/assets'

// Turns a date into "2 days ago", "Just now", etc.
const timeAgo = (date) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (seconds < 60) return 'Just now'
    const units = [
        ['year', 31536000],
        ['month', 2592000],
        ['day', 86400],
        ['hour', 3600],
        ['minute', 60],
    ]
    for (const [name, secs] of units) {
        const value = Math.floor(seconds / secs)
        if (value >= 1) return `${value} ${name}${value > 1 ? 's' : ''} ago`
    }
}

const Blog = () => {
    const {id} = useParams()

    const [data, setData] = useState(null)
    const [comments, setComments] = useState([])

    const [name, setName] = useState('')
    const [content, setContent] = useState('')

    const fetchBlogData = async ()=>{
        const data  = blog_data.find(item => item._id === id)
        setData(data)
    }

    const fetchComments = async ()=>{
        setComments(comments_data.filter(item => item.blog._id === id))
    }

    useEffect(()=>{
        fetchBlogData()
        fetchComments()
    }, [])

    const addComment = (e) => {
        e.preventDefault()
        const newComment = {
            _id: Date.now().toString(),
            blog: data,
            name: name.trim(),
            content: content.trim(),
            isApproved: false,
            createdAt: new Date().toISOString(),
        }
        setComments([newComment, ...comments])
        // later: send { blog: id, name, content } to your backend
        setName('')
        setContent('')
    }

    return data ? (
        <div className='relative'>
            {/* Background gradient */}
            <img
                src={assets.gradientBackground}
                alt=''
                className='absolute -top-50 -z-1 opacity-50'
            />

            {/* Blog header */}
            <div className='text-center mt-20 text-gray-600 mx-8'>
                <p className='text-primary py-4 font-medium'>
                    Published on{' '}
                    {new Date(data.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </p>
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>
                    {data.title}
                </h1>
                <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle?.trim()}</h2>
                <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>
                    Michael Brown
                </p>
            </div>

            <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
                <img src={data.image} alt={data.title} className='rounded-3xl mb-5 w-full' />

                {/* Blog description (HTML) */}
                <div
                    className='rich-text max-w-3xl mx-auto'
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.description) }}
                />

                {/* Comments list */}
                <div className='mt-14 mb-10 max-w-3xl mx-auto'>
                    <p className='font-semibold mb-4'>Comments ({comments.length})</p>

                    <div className='flex flex-col gap-4'>
                        {comments.map((item) => (
                            <div
                                key={item._id}
                                className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'
                            >
                                <div className='flex items-center gap-2 mb-2'>
                                    <img src={assets.user_icon} alt='user' className='w-6' />
                                    <p className='font-medium'>{item.name}</p>
                                </div>
                                <p className='text-sm max-w-md ml-8'>{item.content}</p>
                                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>
                                    {timeAgo(item.createdAt)}
                                </div>
                            </div>
                        ))}

                        {comments.length === 0 && (
                            <p className='text-sm text-gray-500'>No comments yet. Be the first!</p>
                        )}
                    </div>
                </div>

                {/* Add comment form */}
                <div className='max-w-3xl mx-auto'>
                    <p className='font-semibold mb-4'>Add your comment</p>
                    <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Name'
                            required
                            className='w-full p-2 border border-gray-300 rounded outline-none'
                        />
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder='Comment'
                            required
                            className='w-full p-2 border border-gray-300 rounded outline-none h-48'
                        />
                        <button
                            type='submit'
                            className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* Share buttons */}
                <div className='my-24 max-w-3xl mx-auto'>
                    <p className='font-semibold my-4'>Share this article on social media</p>
                    <div className='flex'>
                        <img src={assets.facebook_icon} width={50} alt='facebook' />
                        <img src={assets.twitter_icon} width={50} alt='twitter' />
                        <img src={assets.googleplus_icon} width={50} alt='google plus' />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <p className='text-center mt-20 text-gray-500'>Loading...</p>
    )
}

export default Blog