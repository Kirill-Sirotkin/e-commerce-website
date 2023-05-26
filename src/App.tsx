import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Navigation from './pages/Navigation'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/profile",
        element: <Profile />,
      }]
  },
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App