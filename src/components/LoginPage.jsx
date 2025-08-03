import { useState } from "react";
import "../css/loginPage.css";

export default function LoginPage({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in both fields");
      return;
    }
    console.log("Login submitted", { email, password });
  };

  return (
    <section className="Login-page">
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center font-serif text-blue-800 mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between text-sm text-blue-600">
              <a href="#" className="hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <button
              onClick={onSwitch}
              className="text-blue-600 hover:underline"
            >
              Register
            </button>
          </p>
        </div>
        <p className="mt-8 text-xs text-gray-500 text-center">
          &copy; {new Date().getFullYear()} Chatbox. Created by{" "}
          <span className="font-medium text-blue-700">Pratham Gehlot</span>. All
          rights reserved.
        </p>
      </div>
    </section>
  );
}
