import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Products from './pages/Products'
import Navigation from './pages/Navigation'
import Product from './pages/Product'

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
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />
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