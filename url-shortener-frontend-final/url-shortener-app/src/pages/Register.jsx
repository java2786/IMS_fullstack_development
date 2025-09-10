import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import useAuthStore from "../store/auth";
import apiFetch from "../api";
import { Link, useNavigate } from "react-router";

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const setToken = useAuthStore((s) => s.setToken);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const res = await apiFetch("/auth/register", { method: "POST", body: data });
      setToken(res.token);
      navigate("/shorten");
    } catch (e) {
      setError(e.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("username")}
          className="w-full p-2 border rounded" placeholder="Username" />
        {errors.username && <div className="text-red-500 text-sm">{errors.username.message}</div>}
        <input {...register("password")}
          type="password" className="w-full p-2 border rounded" placeholder="Password" />
        {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </form>
      <div className="mt-2 text-sm">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></div>
    </div>
  );
}
