import { createRoot } from "react-dom/client";

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./components/Login";

function Header({ }) {
    return (
        <div>
            <Link to="/home">Home</Link> |
            <Link to="/login">Login</Link> |
            <Link to="/about">About</Link> |
            <Link to="/welcome">Welcome</Link>
        </div>
    );
}

function Home() {
    return (
        <div>
            <Header />

            <h1>Home Component</h1>

        </div>
    );
}

function About() {
    return (
        <div>
            <Header />

            <h1>About Component</h1>

        </div>
    );
}

function App() {
    return (
        <div>
            <Header />

            <h1>App Component</h1>
        </div>
    );
}

createRoot(document.getElementById("root"))
    .render(
        <div>

            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/welcome" element={<App />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );