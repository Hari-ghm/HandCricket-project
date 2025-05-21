import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

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
            />
            <div className="flex items-center gap-2 mb-6">
              <input
                type="text"
                placeholder="Username"
                className="w-[90%] p-2 rounded bg-white/30 text-black placeholder:text-gray-700"
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

            <button className="w-full mt-2 mb-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
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
