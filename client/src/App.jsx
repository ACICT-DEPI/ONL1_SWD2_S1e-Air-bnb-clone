import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import NotFound from "./pages/NotFound.jsx";
import About from "./pages/About.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import WhyUs from "./pages/WhyUs.jsx";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<IndexPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route
              path="account"
              element={
                <ProtectedRoute>
                  <ProfileLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AccountPage />} />
              <Route path="places" element={<PlacesPage />} />
              <Route path="bookings" element={<BookingsPage />} />
              <Route path="bookings/:id" element={<BookingPage />} />
              <Route path="places/new" element={<PlacePageForm />} />
              <Route path="places/:id" element={<PlacePageForm />} />
            </Route>
            <Route path="place/:id" element={<PlaceDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          // Define default options
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
          },
        }}
      />
    </UserContextProvider>
  );
}

export default App;
