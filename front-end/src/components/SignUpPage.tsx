import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // checks if email is valid
      if (!emailRegex.test(email)) {
        alert("Invalid email address");
        return;
      }
      
      const usernameRegex = /^[A-Za-z0-9_]{4,15}$/; // checks if username is valid
      if (!usernameRegex.test(username)) {
        alert("Username must be 4-15 characters and can only contain letters, numbers, and underscores.");
        return;
      }

      const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&])[A-Za-z\d@#$%&]{8,20}$/;

      if (!passwordRegex.test(password)) {
        alert(
          "Password must be 8-20 characters, include uppercase, lowercase, number, and one special character (@, #, $, %, &), and contain no spaces."
        );
        return
      }

      const res = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();
      console.log(data)
      if (res.ok) {
        alert("OTP sent to email!");
        navigate("/verify-otp", {
          state: {
            email,
            username,
            password,
          },
        });
        
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
  };
  
  return (
    <div>
      <div className="bg-[url('/login_bg_photo.png')] bg-cover bg-center h-screen w-full relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-screen-full w-96 rounded-xl p-7 shadow-xl bg-white/20 backdrop-blur-md text-white text-center">
            <h2 className="text-3xl font-semibold mb-6">Sign Up</h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-6 p-2 rounded bg-white/30 text-black placeholder:text-gray-700"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center gap-2 mb-6">
              <input
                type="text"
                placeholder="Username"
                className="w-[90%] p-2 rounded bg-white/30 text-black placeholder:text-gray-700"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="relative group">
                <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-white text-sm cursor-pointer pointer-events-auto">
                  i
                </div>
                <div className="absolute bottom-full mb-2 w-64 text-sm bg-gray-800 text-white rounded-md px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                  Username must be 4-15 characters, unique for each account,
                  contains no special characters except underscore
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <input
                type="text"
                placeholder="password"
                className="w-[90%] p-2 rounded bg-white/30 text-black placeholder:text-gray-700"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="relative group">
                <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-white text-sm cursor-pointer pointer-events-auto">
                  i
                </div>
                <div className="absolute bottom-full mb-2 w-64 text-sm bg-gray-800 text-white rounded-md px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                  Password must be 8 to 20 characters long and include at least
                  one uppercase letter, one lowercase letter, one number, and
                  one special character such as @, #, $, %, or &. Spaces are not
                  allowed.
                </div>
              </div>
            </div>

            <button
              className="w-full mt-2 mb-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
              type="submit"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
            <div className="text-white p-2 text-left">
              Already have an account ? sign In below
            </div>
            <button
              className="w-1/4 mb-4 bg-yellow-500 hover:bg-pink-600 text-white py-2 rounded-full"
              onClick={() => navigate("/")}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
