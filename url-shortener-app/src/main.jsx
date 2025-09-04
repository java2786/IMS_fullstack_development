import { createRoot } from "react-dom/client";

function Button({name}){
    return(
        <button>{name}</button>
    );
}

function App(){
    return (
       <div>
         <h1>Hello, world!</h1>
         <Button name="Login"/>
         <Button name="Logout"/>
         <Button name="Registration"/>
       </div>
    );
}

createRoot(document.getElementById("root"))
    .render(<App/>);