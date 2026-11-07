import React from 'react'
import toast from 'react-hot-toast'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'

const CommentTableItem = ({ comment, fetchComments }) => {
    const { axios } = useAppContext()
    const { blog, createdAt, _id, name, content, isApproved } = comment
    const commentDate = new Date(createdAt)

    const approveComment = async () => {
        try {
            const { data } = await axios.post('/api/admin/approve-comment', { id: _id })
            if (data.success) {
                toast.success(data.message)
                fetchComments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const deleteComment = async () => {
        if (!window.confirm('Delete this comment?')) return
        try {
            const { data } = await axios.post('/api/admin/delete-comment', { id: _id })
            if (data.success) {
                toast.success(data.message)
                fetchComments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <tr className='border-y border-gray-300'>
            <td className='px-6 py-4'>
                <p>
                    <b className='font-medium text-gray-600'>Blog</b> : {blog?.title || 'Deleted blog'}
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