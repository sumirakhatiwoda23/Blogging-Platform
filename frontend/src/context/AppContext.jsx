import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

// works with either name in your frontend .env: VITE_BASE_URL or VITE_API_URL
axios.defaults.baseURL =
    import.meta.env.VITE_BASE_URL || import.meta.env.VITE_API_URL

const AppContext = createContext()

export const AppProvider = ({ children }) => {
    // read the saved token and set the header right away, before any child effect runs
    const [token, setToken] = useState(() => {
        const saved = localStorage.getItem('token')
        if (saved) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${saved}`
        }
        return saved
    })
    const [blogs, setBlogs] = useState([])
    const [input, setInput] = useState('')   // search text

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blog/all')
            data.success ? setBlogs(data.blogs) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    // load the public blogs once when the app starts
    useEffect(() => {
        fetchBlogs()
    }, [])

    // keep the Authorization header in sync when the token changes (login / logout)
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
    }, [token])

    const value = {
        axios,
        token,
        setToken,
        blogs,
        setBlogs,
        input,
        setInput,
        fetchBlogs,
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)