import React, {FormEvent, useState} from 'react';
import UrbanPilotLogo from "../../images/UrbanPilotLogo.png";
import './Login.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

type Props = {
    postLogin: (username:string,password:string) => Promise<void>;
}

function Login(props:Props) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const nav = useNavigate();

    function loginInputHandler(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.postLogin(username,password)
            .then(()=> nav("/hello")
            );
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
                    <button type={"submit"}>Login</button>
                </form>
                <h4>New here?</h4>
                <button>Sign up</button>
            </div>
        </div>
    );
}

export default Login;