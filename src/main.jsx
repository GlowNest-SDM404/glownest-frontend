import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ForgotPassword from "./pages/forgotPass.jsx";
import ResetPass from "./pages/resetPass.jsx";
import Home from "./pages/Home.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
       <Route path="/forgotPass" element={<ForgotPassword />} />
          <Route path="/resetPass" element={<ResetPass />} />
             <Route path="/home" element={<Home />} />
    </Routes>
  </BrowserRouter>
);
