import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import axios from "axios"
import SignupPage from "./pages/SignupPage"
import { UserContextProvider } from "./sharedContext/UserContext"
import TestPaperForm from "./pages/TestPaperForm"
import ProfilePage from "./pages/ProfilePage"
import QuizPage from "./pages/QuizPage"
import ResultPage from "./pages/ResultPage"
import ReviewPage from "./pages/ReviewPage"

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
  return (

    <UserContextProvider>
      <Routes>
      <Route index element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/user" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/user/quizpaper" element={<TestPaperForm/>} />
        <Route path="/user/profile" element={<ProfilePage/>} />
        <Route path="/user/result/:id?" element = {<ResultPage/>} />
        <Route path="/user/reviewQuiz/:id?" element={<ReviewPage/>} />
      </Route>
      <Route path="/quiz/:id?" element={<QuizPage/>} />
    </Routes>
    </UserContextProvider>
  )
}

export default App
