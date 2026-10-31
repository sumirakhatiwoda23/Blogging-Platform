import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import RootLayout from './components/RootLayout'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'

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
    element: <Layout />,
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
  return <RouterProvider router={router} />
}