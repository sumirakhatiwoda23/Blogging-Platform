import React, { useEffect, useState } from 'react'
import { comments_data } from '../../assets/assets'
import CommentTableItem from '../../components/admin/CommentTableItem'

const Comments = () => {
    const [comments, setComments] = useState([])
    const [filter, setFilter] = useState('Not Approved')

    const fetchComments = async () => {
        setComments(comments_data)
    }

    useEffect(() => {
        fetchComments()
    }, [])

    const filteredComments = comments.filter((comment) =>
        filter === 'Approved' ? comment.isApproved : !comment.isApproved
    )

    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 overflow-y-auto'>
            <div className='flex justify-between items-center max-w-3xl'>
                <h1>Comments</h1>

                <div className='flex gap-4'>
                    {['Approved', 'Not Approved'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setFilter(item)}
                            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
                                filter === item ? 'text-primary border-primary' : 'text-gray-700'
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-xs text-gray-700 text-left uppercase'>
                        <tr>
                            <th className='px-6 py-3'>Blog Title & Comment</th>
                            <th className='px-6 py-3 max-sm:hidden'>Date</th>
                            <th className='px-6 py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredComments.map((comment) => (
                            <CommentTableItem
                                key={comment._id}
                                comment={comment}
                                fetchComments={fetchComments}
                            />
                        ))}
                    </tbody>
                </table>

                {filteredComments.length === 0 && (
                    <p className='text-center text-gray-500 py-8'>No comments found.</p>
                )}
            </div>
        </div>
    )
}

export default Comments