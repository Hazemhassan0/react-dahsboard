import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10"
      >
        <div className="text-center mb-6">
          <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mb-3">
            H
          </div>
          <h2 className="text-2xl font-bold mb-1 text-gray-800">Welcome!</h2>
          <p className="text-sm text-gray-500">Sign in to your Dashboard</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
              Remember me
            </label>
            <a href="#" className="text-blue-500 hover:underline">Forgot?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
