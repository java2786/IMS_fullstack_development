import { Link, useNavigate } from "react-router";
import useAuthStore from "../store/auth";

export default function Header() {
  const token = useAuthStore((s) => s.token);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <nav className="space-x-4">
        {token ? (
          <>
            <Link to="/shorten" className="text-blue-600 hover:underline">Shorten</Link>
            <Link to="/my-urls" className="text-blue-600 hover:underline">My URLs</Link>
            <button onClick={handleLogout} className="ml-2 text-red-500 hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          </>
        )}
      </nav>
      <span className="font-bold text-lg text-gray-700">URL Shortener</span>
    </header>
  );
}
