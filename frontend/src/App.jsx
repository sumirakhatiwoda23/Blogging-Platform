import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import Home from './pages/Home'
import RootLayout from './components/RootLayout'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Login from './components/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'

// same as the screenshot: token ? <Layout/> : <Login/>
const AdminRoute = () => {
  const { token } = useAppContext()
  return token ? <Layout /> : <Login />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/blog/:id',
        element: <Blog />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminRoute />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'addBlog',
        element: <AddBlog />,
      },
      {
        path: 'listBlog',
        element: <ListBlog />,
      },
      {
        path: 'comments',
        element: <Comments/>,
      },
    ],
  },
])

export default function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}