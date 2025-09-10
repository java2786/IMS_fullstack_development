import { useEffect, useState } from "react";
import apiFetch from "../api";

export default function MyUrls() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/my-urls")
      .then(setUrls)
      .catch((e) => setError(e.data?.message || "Failed to load URLs"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">My URLs</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <ul className="space-y-2">
        {urls.map((u) => (
          <li key={u.shortCode} className="p-2 border rounded flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-mono text-blue-600">{u.shortUrl}</div>
              <div className="text-xs text-gray-500">{u.originalUrl}</div>
            </div>
            <a href={u.shortUrl} className="text-blue-500 underline mt-2 md:mt-0" target="_blank" rel="noopener noreferrer">Open</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
