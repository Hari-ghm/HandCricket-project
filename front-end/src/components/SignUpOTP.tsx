import { useLocation,useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUpOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, username, password } = location.state || {};
  const [otp, setOtp] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and max 6 digits
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  return (
    <div className="bg-[url('/login_bg_photo.png')] bg-cover bg-center h-screen w-full relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 rounded-xl p-7 shadow-xl bg-white/20 backdrop-blur-md text-white text-center">
          <h2 className="text-lg mb-4">
            OTP has been successfully sent to{" "}
            <span className="font-bold">{email}</span>
          </h2>

          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={handleChange}
            className="w-full text-center text-black text-lg tracking-widest px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 placeholder:text-gray-500"
          />

          <button
            onClick={async () => {
              try {
                const res = await fetch(
                  "http://localhost:3001/verify-otp",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      email,
                      otp,
                      username,
                      password,
                    }),
                  }
                );

                const data = await res.json();

                if (res.ok) {
                  alert("OTP verified and signup successful!");
                  navigate("/");
                } else {
                  alert(data.error || "Verification failed");
                }
              } catch (error) {
                console.error("Error verifying OTP:", error);
                alert("Server error");
              }
            }}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpOTP;
