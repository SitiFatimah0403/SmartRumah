import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import HomePage from "./components/homepage/Homepage"
import SearchPage from "./components/search/SearchPage"
import SavedPage from "./components/saved/SavedPage"
import ProfilePage from "./components/profile/ProfilePage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App