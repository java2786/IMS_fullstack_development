import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import apiFetch from "../api";

const schema = z.object({
  originalUrl: z.string().url(),
});

export default function Shorten() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await apiFetch("/shorten", { method: "POST", body: data });
      setResult(res);
    } catch (e) {
      setError(e.data?.message || "Shorten failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Shorten URL</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("originalUrl")}
          className="w-full p-2 border rounded" placeholder="Paste your long URL here" />
        {errors.originalUrl && <div className="text-red-500 text-sm">{errors.originalUrl.message}</div>}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded" disabled={loading}>
          {loading ? "Shortening..." : "Shorten"}
        </button>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </form>

</div>
  )

}