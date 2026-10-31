import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import Sidebar from '../../components/admin/Sidebar'
import Login from '../../components/admin/Login'

const Layout = () => {
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem('token'))

    const handleLogin = (newToken) => {
        localStorage.setItem('token', newToken)
        setToken(newToken)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        navigate('/')
    }

    if (!token) {
        return <Login onLogin={handleLogin} />
    }

    return (
        <>
            <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
                <img
                    src={assets.logo}
                    alt='logo'
                    className='w-32 sm:w-40 cursor-pointer'
                    onClick={() => navigate('/')}
                />
                <button
                    onClick={logout}
                    className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'
                >
                    Logout
                </button>
            </div>

            <div className='flex h-[calc(100vh-70px)]'>
                <Sidebar />
                <Outlet />
            </div>
        </>
    )
}

export default Layout