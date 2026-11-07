import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Header = () => {
    const { input, setInput } = useAppContext()
    const [text, setText] = useState(input)

    // when the search is cleared elsewhere (logo, Clear button), clear the box too
    useEffect(() => {
        setText(input)
    }, [input])

    const handleSubmit = (e) => {
        e.preventDefault()
        setInput(text.trim())
    }

    return (
        <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
            <div className='text-center mt-20 mb-8'>

                {/* Badge */}
                <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
                    <p>New: AI feature integrated</p>
                    <img src={assets.star_icon} className='w-2.5' alt="star" />
                </div>

                {/* Headline */}
                <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>
                    Your own <span className='text-primary'>blogging</span> <br /> platform.
                </h1>

                {/* Subtext */}
                <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>
                    This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.
                </p>

                {/* Search */}
                <form
                    onSubmit={handleSubmit}
                    className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'
                >
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value)
                            if (e.target.value.trim() === '') setInput('')   // empty box shows all blogs again
                        }}
                        placeholder='Search blogs'
                        className='w-full pl-4 outline-none'
                    />
                    <button
                        type='submit'
                        className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer'
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Background gradient */}
            <img
                src={assets.gradientBackground}
                alt=""
                className='absolute -top-50 -z-1 opacity-50'
            />
        </div>
    )
}

export default Header