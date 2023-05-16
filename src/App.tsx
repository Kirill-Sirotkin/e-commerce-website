import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Product from './pages/Product'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/product",
    element: <Product />,
    errorElement: <NotFound />,
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement: <NotFound />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <NotFound />,
  }
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App