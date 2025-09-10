import { useParams } from "react-router";
import { useEffect, useState } from "react";
import apiFetch from "../api";

export default function Resolve() {
  const { code } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch(`/findByCode/${code}`)
      .then(setData)
      .catch((e) => setError(e.data?.message || "Not found"))
      .finally(() => setLoading(false));
  }, [code]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Resolve Code</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {data && (
        <div>
          <div>Short URL: <span className="font-mono text-blue-600">{data.shortUrl}</span></div>
          <div>Original URL: <a href={data.originalUrl} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{data.originalUrl}</a></div>
        </div>
      )}
    </div>
  );
}
