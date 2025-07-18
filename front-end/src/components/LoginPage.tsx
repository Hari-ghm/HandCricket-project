import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [EmailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ EmailOrUsername, password }),
      });
      
      const data = await res.json();

      if (res.ok) {
        alert("Login successful!");
        navigate("/dashboard")
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div>
      <div className="bg-[url('/login_bg_photo.png')] bg-cover bg-center h-screen w-full relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-96 w-96 rounded-xl p-7 shadow-xl bg-white/20 backdrop-blur-md text-white text-center">
            <h2 className="text-3xl font-semibold mb-6">Login</h2>
            <input
              type="email/username"
              placeholder="Email / Username"
              className="w-full mb-6 p-2 rounded bg-white/30 text-black placeholder:text-gray-700"
              required
              value={EmailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-6 p-2 rounded bg-white/30 text-black placeholder:text-gray-700"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full mt-2 mb-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <div className="text-white p-2 text-left">
              Dont have an account, sign up below
            </div>
            <button
              className="w-1/4 mb-4 bg-yellow-500 hover:bg-pink-600 text-white py-2 rounded-full"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
