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
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Register</h2>
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
          placeholder="Name"
          {...register("name")}
          required
          style={{ padding: "0.5rem" }}
        />
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
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
