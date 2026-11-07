import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import toast from 'react-hot-toast'
import { assets, blogCategories } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'

const AddBlog = () => {
    const { axios, fetchBlogs } = useAppContext()

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    const [image, setImage] = useState(false)
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [category, setCategory] = useState('Startup')
    const [isPublished, setIsPublished] = useState(false)
    const [loading, setLoading] = useState(false)
    const [adding, setAdding] = useState(false)

    // start the Quill editor once
    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
        }
    }, [])

    const generateContent = async () => {
        if (!title) return toast.error('Enter a title first')
        try {
            setLoading(true)
            const { data } = await axios.post('/api/blog/generate', { title })
            if (data.success) {
                quillRef.current.root.innerHTML = data.content
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (!image) return toast.error('Please upload a thumbnail')

        // an empty Quill editor still contains <p><br></p>, so check the plain text
        if (!quillRef.current.getText().trim()) {
            return toast.error('Please write the blog description')
        }

        const blog = {
            title,
            subTitle,
            description: quillRef.current.root.innerHTML,   // HTML string
            category,
            isPublished,
        }

        const formData = new FormData()
        formData.append('blog', JSON.stringify(blog))
        formData.append('image', image)

        try {
            setAdding(true)
            const { data } = await axios.post('/api/blog/add', formData)

            if (data.success) {
                toast.success(data.message)
                fetchBlogs()   // refresh the list on the home page
                // reset the form
                setImage(false)
                setTitle('')
                setSubTitle('')
                setCategory('Startup')
                setIsPublished(false)
                quillRef.current.root.innerHTML = ''
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setAdding(false)
        }
    }

    return (
        <form
            onSubmit={onSubmitHandler}
            className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'
        >
            <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>

                <p>Upload thumbnail</p>
                <label htmlFor='image'>
                    <img
                        src={!image ? assets.upload_area : URL.createObjectURL(image)}
                        alt=''
                        className='mt-2 h-16 rounded cursor-pointer'
                    />
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type='file'
                        id='image'
                        accept='image/*'
                        hidden
                    />
                </label>

                <p className='mt-4'>Blog title</p>
                <input
                    type='text'
                    placeholder='Type here'
                    required
                    className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <p className='mt-4'>Sub title</p>
                <input
                    type='text'
                    placeholder='Type here'
                    required
                    className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
                    onChange={(e) => setSubTitle(e.target.value)}
                    value={subTitle}
                />

                <p className='mt-4'>Blog description</p>
                <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
                    <div ref={editorRef}></div>
                    <button
                        type='button'
                        onClick={generateContent}
                        disabled={loading}
                        className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'
                    >
                        {loading ? 'Generating...' : 'Generate with AI'}
                    </button>
                </div>

                <p className='mt-4'>Blog category</p>
                <select
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    name='category'
                    className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'
                >
                    {blogCategories
                        .filter((item) => item !== 'All')
                        .map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                </select>

                <div className='flex gap-2 mt-4'>
                    <p>Publish Now</p>
                    <input
                        type='checkbox'
                        checked={isPublished}
                        className='scale-125 cursor-pointer'
                        onChange={(e) => setIsPublished(e.target.checked)}
                    />
                </div>

                <button
                    disabled={adding}
                    type='submit'
                    className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'
                >
                    {adding ? 'Adding...' : 'Add Blog'}
                </button>
            </div>
        </form>
    )
}

export default AddBlog