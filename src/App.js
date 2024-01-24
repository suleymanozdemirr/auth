import './index.css'
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'

import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'
import Home from './pages/Home'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<SigninPage />} />
      <Route path="register" element={<SignupPage />} />
      <Route path="home" element={<Home />} />
    </Route>
  )
)
function App() {
  return <RouterProvider router={router} />
}

export default App
