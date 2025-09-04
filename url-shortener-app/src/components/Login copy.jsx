import { useState } from "react";

function Login({}) {
    // let uname = "demo";
    const [uname, setUname] = useState("admin@gmail.com");
    const [upwd, setUpwd] = useState("admin123");


    async function handleLogin() {
        console.log("Login Clicked", uname, upwd);
        const response = await fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            body: JSON.stringify({
                "email": uname,
                "password": upwd
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        console.log(data);
    }
    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={function(event){
                event.preventDefault();
                handleLogin();
            }}>
                Username: <input type="text" onChange={function(event){
                    setUname(event.target.value);
                }} value={uname} /> <br />

                Password: <input type="text" onChange={function(event){
                    setUpwd(event.target.value);
                }} value={upwd} /> <br />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;


/*

POST http://localhost:8080/api/users/login
content-type: application/json 

{
    "email": "admin@gmail.com",
    "password": "admin123"
}

*/