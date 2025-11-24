import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { API } from "../api";

interface RegsiterForm {
  name: string,
  email: string,
  password: string
}

export const Register = () => {
  const { register, handleSubmit } = useForm<RegsiterForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegsiterForm) => {
    try {
      await axios.post(`${API}/api/auth/register`, data);
      alert("Registration successful! You can now login.");
      navigate("/login");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="bg-gray-dark w-full max-w-sm p-8 rounded-2xl shadow-lg animate-fadeIn">
        <h2 className="text-2xl font-bold text-accent mb-6 text-center">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-light focus:outline-none focus:ring-2 focus:ring-accent"
          />

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
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-accent font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};
