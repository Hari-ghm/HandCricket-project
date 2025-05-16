const LoginPage = () => {
  return (
    <div>
      <div className="bg-[url('/login_bg_photo.png')] bg-cover bg-center h-screen w-full relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-96 w-96 rounded-xl p-7 shadow-xl bg-white/20 backdrop-blur-md text-white text-center">
            <h2 className="text-3xl font-semibold mb-6">Login</h2>
            <input
              type="email"
              placeholder="Email / Username"
              className="w-full mb-6 p-2 rounded bg-white/30 text-black placeholder:text-gray-700"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-6 p-2 rounded bg-white/30 text-black placeholder:text-gray-700"
            />
            <button className="w-full mt-2 mb-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
              Sign In
            </button>
            <div className="text-white p-2 text-left">
              Dont have an account, sign up below
            </div>
            <button className="w-1/4 mb-4 bg-yellow-500 hover:bg-pink-600 text-white py-2 rounded-full">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage
