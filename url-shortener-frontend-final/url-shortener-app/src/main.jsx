import { createRoot } from "react-dom/client";
import "./style.css"


import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shorten from "./pages/Shorten";
import MyUrls from "./pages/MyUrls";
import Resolve from "./pages/Resolve";
import useAuthStore from "./store/auth";
import Header from "./components/Header";

function App() {
    const token = useAuthStore((s) => s.token);
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
                <Header />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/shorten" element={token ? <Shorten /> : <Navigate to="/login" />} />
                    <Route path="/my-urls" element={token ? <MyUrls /> : <Navigate to="/login" />} />
                    <Route path="/resolve/:code" element={<Resolve />} />
                    <Route path="*" element={<Navigate to="/shorten" />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

createRoot(document.getElementById("root")).render(<App />);

    