import React from 'react'
import DiabetesForm from './components/diabpred'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/home'
import HeartPred from './components/heartpred'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path : "/diabetes",
      element: <DiabetesForm/> 
    },
    {
      path:"/heart",
      element : <HeartPred/>
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App