import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../redux/auth/authSlice";
import { Navigate } from "react-router-dom";

export default function LoginRegister() {
  const dispatch = useDispatch();
  const { error, user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "abak00@gmail.com", password: "Fw19_0841" });
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(login(form)).unwrap();
    } else {
      dispatch(register(form)).unwrap();
    }
  };
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {isLogin ? "Login to Your Account" : "Create an Account"}
      </h2>

      {error && <p className="mb-4 text-red-600 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-semibold">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded focus:outline-none focus:ring"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded focus:outline-none focus:ring"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          className="text-sm text-blue-500 hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}
