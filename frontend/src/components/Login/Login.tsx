import React, {FormEvent, useState} from 'react';
import UrbanPilotLogo from "../../images/UrbanPilotLogo.png";
import './Login.css';
import axios from "axios";

function Login(props:any) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function loginInputHandler(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post("user/login",undefined,{auth:{username,password}})
            .then(response => console.log(response.data));
    }

    return (
        <div>
            <div className={"welcomeContainer"}>
                <div className={"welcomeLogoContainer"}>
                    <img src={UrbanPilotLogo} alt={"UrbanPilotLogo"}/>
                </div>
                <h3>Discover. Share. Conquer the urban jungle.</h3>
            </div>
            <div>
                <h1>Please login:</h1>
            </div>
            <div>
                <form onSubmit={loginInputHandler}>
                    <input type={"text"} placeholder={"Username..."} onChange={event => setUsername(event.target.value)}/>
                    <input type={"password"} placeholder={"Password..."} onChange={event => setPassword(event.target.value)}/>
                    <button>Login</button>
                </form>
                <h4>New here?</h4>
                <button>Sign up</button>
            </div>
        </div>
    );
}

export default Login;