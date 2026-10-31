import React, { useState } from 'react'

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        // later: send { email, password } to your backend and get a token back
        // const res = await fetch('http://localhost:3000/api/admin/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, password }),
        // })
        // const data = await res.json()
        // if (!data.success) return alert(data.message)
        // onLogin(data.token)

        onLogin('demo-token')   // temporary: accepts any email and password
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='w-full py-6 text-center'>
                        <h1 className='text-3xl font-bold'>
                            <span className='text-primary'>Admin</span> Login
                        </h1>
                        <p className='font-light text-gray-500 mt-2'>
                            Enter your credentials to access the admin panel
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
                        <div className='flex flex-col'>
                            <label>Email</label>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder='your email id'
                                className='border-b-2 border-gray-300 p-2 outline-none mb-6'
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label>Password</label>
                            <input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder='your password'
                                className='border-b-2 border-gray-300 p-2 outline-none mb-6'
                            />
                        </div>

                        <button
                            type='submit'
                            className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all'
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login