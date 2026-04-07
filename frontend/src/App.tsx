import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeDashboard from "./components/homepage/HomePage";
import SearchPage from "./components/search/SearchPage";
import SavedPage from "./components/saved/SavedPage";
import ProfilePage from "./components/profile/ProfilePage";
import ProfileEdit from "./components/profile/ProfileEdit";
import PersonalInformationPage from "./components/profile/PersonalInformationPage";
import EmploymentDetailsPage from "./components/profile/EmploymentDetailsPage";
import PropertyPreferencesPage from "./components/profile/PropertyPreferencesPage";
import SchemeEligibilityPage from "./components/profile/SchemeEligibilityPage";
import SchemeInterestPage from "./components/profile/SchemeInterestPage";
import PropertyDetail from "./components/homepage/PropertyDetail";
import AllProperty from "./components/homepage/AllProperty";
import HousingScheme from "./components/homepage/HousingScheme";
import AllHousingScheme from "./components/homepage/AllHousingScheme";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<ProtectedRoute> <HomeDashboard /> </ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute> <SearchPage /> </ProtectedRoute>} />
      <Route path="/saved" element={<ProtectedRoute> <SavedPage /> </ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute> <ProfilePage /> </ProtectedRoute>} />
      <Route path="/profile/edit" element={<ProtectedRoute> <ProfileEdit /> </ProtectedRoute>} />
      <Route path="/profile/edit/personal-information" element={<ProtectedRoute> <PersonalInformationPage /> </ProtectedRoute>} />
      <Route path="/profile/edit/employment-details" element={<ProtectedRoute> <EmploymentDetailsPage /> </ProtectedRoute>} />
      <Route path="/profile/edit/property-preferences" element={<ProtectedRoute> <PropertyPreferencesPage /> </ProtectedRoute>} />
      <Route path="/profile/edit/scheme-eligibility" element={<ProtectedRoute> <SchemeEligibilityPage /> </ProtectedRoute>} />
      <Route path="/profile/edit/scheme-interest" element={<ProtectedRoute> <SchemeInterestPage /> </ProtectedRoute>} />
      <Route path="/property/:id" element={<ProtectedRoute><PropertyDetail /> </ProtectedRoute>} />
      <Route path="/all-properties" element={<ProtectedRoute> <AllProperty /> </ProtectedRoute>} />
      <Route path="/housing-schemes" element={<ProtectedRoute> <HousingScheme /> </ProtectedRoute>} />
      <Route path="/all-housing-schemes" element={<ProtectedRoute> <AllHousingScheme /> </ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
    </BrowserRouter>
  )
}

export default App