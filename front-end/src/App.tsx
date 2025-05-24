// App.tsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import SignUpOTP from "./components/SignUpOTP";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/verify-otp" element={<SignUpOTP />} />
    </Routes>
  );
}
