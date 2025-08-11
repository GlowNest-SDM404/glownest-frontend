import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPass from "./pages/ResetPassword.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProtectedLayout from "./components/ProtectLayout.jsx";
import SearchResultsPage from "./pages/SearchResultsPage.jsx";
import Profile from "./pages/Profile.jsx";
import WishList from "./pages/WishList.jsx";
import CheckOut from "./pages/CheckOut.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import Home from "./pages/Home.jsx";
import ProductListPage from "./pages/ProductListPage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPass />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
