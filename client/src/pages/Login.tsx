import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { API } from "../api";

interface LoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await axios.post(`${API}/api/auth/login`, data);
      // localStorage.setItem("token", res.data.data.token);
      
      const token = res.data?.data?.token;
      if (!token) throw new Error("Missing token in response");

      login(token);

      alert("Login successful!");
      navigate("/dashboard");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="bg-gray-dark w-full max-w-sm p-8 rounded-2xl shadow-lg animate-fadeIn">
        <h2 className="text-2xl font-bold text-accent mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-light focus:outline-none focus:ring-2 focus:ring-accent"
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-light focus:outline-none focus:ring-2 focus:ring-accent"
          />

          <button
            type="submit"
            className="w-full bg-accent text-navy py-2 rounded-lg font-semibold hover:bg-gray-light transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-accent font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};
