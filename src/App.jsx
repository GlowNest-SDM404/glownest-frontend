import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPass from "./pages/ResetPassword.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProtectedLayout from "./components/ProtectLayout.jsx";

import Home from "./pages/Home.jsx";

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
