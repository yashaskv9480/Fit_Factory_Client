import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Cart from "./Pages/Cart/Cart";
import ProductDetail from "./Pages/Detail/ProductDetail";
import MobileNavigation from "./Navigation/MobileNavigation";
import DesktopNavigation from "./Navigation/DesktopNavigation";
import Wishlist from "./Pages/WhisList/Wishlist";
import PaymentSuccess from "./Pages/Payment/PaymentSuccess";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutForm from "./Components/Checkout/CheckoutForm";
import UpdateDetails from "./Pages/Update_User/UpdateDetails";
import ForgotPasswordForm from "./Auth/ForgotPassword/ForgotPasswordForm";
import AddNewPassword from "./Auth/ForgotPassword/AddNewPassword";
import AdminLogin from "./Admin/Auth/Login/AdminLogin";
import AdminRegister from "./Admin/Auth/Register/AdminRegister";
import DashBoard from "./Admin/Pages/DashBoard";
import SingleUserPage from "./Admin/Pages/SingleUserPage";
import SingleProduct from "./Admin/Pages/SingleProduct";
import GymDetails from "./Auth/Gym Details/GymDetails";
import SingleLocation from "./SingleLocation/SingleLocation";
import { GymImages } from "./Pages/GymImages/GymImages";
import { Redirect } from "./Redirect/Redirect";
import UserContext, { UserProvider } from "./UserContext/UserContext"; // Import UserProvider
import { useAuth } from "./Auth/useAuth/useAuth";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ProtectedClientRoute from "./ProtectRoutes/ProtectedClientRoutes";
import Unauthorized from "./Unauthorized/Unauthorized";
import ProtectedUserRoutes from "./ProtectRoutes/ProtectedUserRoutes";
import ResetPassword from "./Pages/Reset Password/ResetPassword";
import BookingTable from "./Admin/Components/Tables/BookingTable";
import UserBookings from "./Components/UserBookings/UserBookings";
import UpdateGym from "./Pages/Update_GYm/UpdateGym";

function App() {
  const { isClient, isAdmin } = useContext(UserContext);

  return (
    <>
      <ToastContainer
        toastClassName="toastContainerBox"
        transition={Flip}
        position="top-center"
      />
      <Router>
        <UserProvider>
          <DesktopNavigation />
          <div className="margin">
            <Routes>
              <Route path="/" index element={<HomePage />} />
              <Route path="/client/login" element={<Login client />} />
              <Route path="/user/login" element={<Login />} />
              <Route path="/user/register" element={<Register />} />
              <Route path="/client/register" element={<Register client />} />
              <Route path="/register/gymdetails" element={<GymDetails />} />
              <Route
                path="/gyms/:location/:gym_id"
                element={<ProductDetail />}
              />
              <Route path="gyms/:location" element={<SingleLocation />} />
              <Route path="/user/bookings" element={<UserBookings />} />

              <Route path="/redirect" element={<Redirect />} />

              <Route path="/update" element={<UpdateDetails />} />
              <Route path="/update/gym" element={<UpdateGym />} />

              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/update" element={<UpdateDetails />} />
              <Route path="/gymimages/update" element={<GymImages />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/register" element={<AdminRegister />} />
              <Route path="/admin/home" element={<DashBoard />} />
              <Route path="/admin/home/user/:id" element={<SingleUserPage />} />
              <Route
                path="/admin/home/product/:type/:id"
                element={<SingleProduct />}
              />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<CheckoutForm />} />
              <Route path="/paymentsuccess" element={<PaymentSuccess />} />
              <Route path="/forgotpassword" element={<ForgotPasswordForm />} />
              <Route
                path="/user/reset/:id/:token"
                element={<AddNewPassword />}
              />
            </Routes>
          </div>
          <MobileNavigation />
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
