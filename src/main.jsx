import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './component/Login/Login.jsx';
import Sign from './component/Sign/Sign.jsx';
import Forget from './component/Forget/Forget.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "/sign",
    element: <Sign></Sign>,
  },
  {
    path: "/forget",
    element: <Forget></Forget>
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
    {/* <App /> */}
  </React.StrictMode>,
)
