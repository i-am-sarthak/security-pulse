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
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          margin: "1rem auto",
          gap: "1rem",
        }}
      >
        <input
          placeholder="Email"
          type="email"
          {...register("email")}
          required
          style={{ padding: "0.5rem" }}
        />
        <input
          placeholder="Password"
          type="password"
          {...register("password")}
          required
          style={{ padding: "0.5rem" }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <p className="mt-3 text-sm text-gray-300">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-accent font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </form>
    </div>
  );
};
