import React from 'react'
import { assets } from '../../assets/assets'

const CommentTableItem = ({ comment, fetchComments }) => {
    const { blog, createdAt, _id, name, content, isApproved } = comment
    const commentDate = new Date(createdAt)

    const approveComment = async () => {
        // later: call your backend to approve, then refresh
        console.log('approve:', _id)
        fetchComments?.()
    }

    const deleteComment = async () => {
        if (!window.confirm('Delete this comment?')) return
        // later: call your backend to delete, then refresh
        console.log('delete:', _id)
        fetchComments?.()
    }

    return (
        <tr className='border-y border-gray-300'>
            <td className='px-6 py-4'>
                <p>
                    <b className='font-medium text-gray-600'>Blog</b> : {blog.title}
                </p>
                <p className='mt-2'>
                    <b className='font-medium text-gray-600'>Name</b> : {name}
                </p>
                <p>
                    <b className='font-medium text-gray-600'>Comment</b> : {content}
                </p>
            </td>

            <td className='px-6 py-4 max-sm:hidden'>{commentDate.toLocaleDateString()}</td>

            <td className='px-6 py-4'>
                <div className='flex items-center gap-4'>
                    {!isApproved ? (
                        <img
                            src={assets.tick_icon}
                            alt='approve'
                            onClick={approveComment}
                            className='w-5 hover:scale-110 transition-all cursor-pointer'
                        />
                    ) : (
                        <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>
                            Approved
                        </p>
                    )}
                    <img
                        src={assets.bin_icon}
                        alt='delete'
                        onClick={deleteComment}
                        className='w-5 hover:scale-110 transition-all cursor-pointer'
                    />
                </div>
            </td>
        </tr>
    )
}

export default CommentTableItem