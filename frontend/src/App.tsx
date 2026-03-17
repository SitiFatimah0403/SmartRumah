import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeDashboard from "./components/homepage/HomePage";
import SearchPage from "./components/search/SearchPage";
import SavedPage from "./components/saved/SavedPage";
import ProfilePage from "./components/profile/ProfilePage";
import ProfileEdit from "./components/profile/ProfileEdit";
import PropertyDetail from "./components/homepage/PropertyDetail";
import AllProperty from "./components/homepage/AllProperty";
import HousingScheme from "./components/homepage/HousingScheme";
import AllHousingScheme from "./components/homepage/AllHousingScheme";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomeDashboard />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/saved" element={<SavedPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/edit" element={<ProfileEdit />} />
      <Route path="/property-detail" element={<PropertyDetail />} />
      <Route path="/all-properties" element={<AllProperty />} />
      <Route path="/housing-schemes" element={<HousingScheme />} />
      <Route path="/all-housing-schemes" element={<AllHousingScheme />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
    </BrowserRouter>
  )
}

export default App