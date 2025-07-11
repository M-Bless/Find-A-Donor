import React from 'react';

const Login = () => {
  return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className=" bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700">Email / Username:</label>
            <input
              type="text"
              name="emailOrUsername"
            
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Password:</label>
            <input
              type="password"
              name="password"

              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
