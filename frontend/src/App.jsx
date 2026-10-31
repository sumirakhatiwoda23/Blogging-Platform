import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import RootLayout from './components/RootLayout'
import Blog from './pages/Blog'

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
])

export default function App() {
  return <RouterProvider router={router} />
}
