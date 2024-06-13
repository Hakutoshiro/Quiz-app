import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import axios from "axios"
import SignupPage from "./pages/SignupPage"
import { UserContextProvider } from "./sharedContext/UserContext"

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
  return (

    <UserContextProvider>
      <Routes>
      <Route index element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/user" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App
