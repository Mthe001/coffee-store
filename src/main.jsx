import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './providers/AuthProvider'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home'
import AddCofee from './components/AddCofee'
import UpdateCofee from './components/UpdateCofee'
import Login from './components/Login'
import SignIn from './components/SignIn'
import User from './components/User'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: () => fetch('http://localhost:5000/coffee')
  },
  {
    path: 'addCoffee',
    element: <AddCofee />,

  },
  {
    path: 'updateCoffee/:id',
    element: <UpdateCofee />,
    loader: ({ params }) => fetch(`http://localhost:5000/coffee/${params.id}`)
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <SignIn />,
  },
  {
    path: 'users',
    element: <User />,
    loader: () => fetch('http://localhost:5000/users')
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
