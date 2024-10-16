import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";

// axios
import "./api/global-axios.js";
import { UserContextProvider } from "./context/UserContext.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import PlacesPage from "./pages/PlacesPage.jsx";
import PlacePageForm from "./pages/PlacePageForm.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
import ProfileLayout from "./layouts/ProfileLayout.jsx";
import PlaceDetails from "./pages/PlaceDetails.jsx";
import BookingPage from "./pages/BookingPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<IndexPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="account" element={<ProfileLayout />}>
              <Route index element={<AccountPage />} />
              <Route path="places" element={<PlacesPage />} />
              <Route path="bookings" element={<BookingsPage />} />
              <Route path="bookings/:id" element={<BookingPage />} />
              <Route path="places/new" element={<PlacePageForm />} />
              <Route path="places/:id" element={<PlacePageForm />} />
            </Route>
            <Route path="place/:id" element={<PlaceDetails />} />
            <Route path="*" element={<div>Not found</div>} />
          </Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
