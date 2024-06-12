import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import axios from "axios"
import SignupPage from "./pages/SignupPage"

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
  return (
    <Routes>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App
