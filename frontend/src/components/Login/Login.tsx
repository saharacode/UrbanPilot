import React, {FormEvent, useState} from 'react';
import UrbanPilotLogo from "../../images/UrbanPilotLogo.png";
import './Login.css';
import {useNavigate} from "react-router-dom";
import {LoginIcon} from "../../icons/login-icon";
import {RegisterIcon} from "../../icons/register-icon";

type Props = {
    postLogin: (username:string,password:string) => Promise<void>;
    userExists: boolean;
    errormessage: string;
}

function Login(props:Props) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const nav = useNavigate();

    function loginInputHandler(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.postLogin(username,password)
            .then(()=> nav("/mainpage")
            );
    }

    function goToSignUpButtonHandler() {
        nav("/register")
    }

    return (
        <div className={"landingpage-container"}>
            <img className="landingpage-logo" src={UrbanPilotLogo} alt={"UrbanPilotLogo"}/>
            <h3>Discover. Share. Conquer the urban jungle.</h3>
            <div className="login-container">
                <h2>Please login:</h2>
                {props.userExists ? <></> : <h5>{props.errormessage}</h5>}
                <form onSubmit={loginInputHandler} className="loginForm">
                    <input className="inputField" type={"text"} placeholder={"Username..."} onChange={event => setUsername(event.target.value)}/>
                    <input className="inputField" type={"password"} placeholder={"Password..."} onChange={event => setPassword(event.target.value)}/>
                    <button className="signup-btn" type={"submit"}>
                        <LoginIcon width={30} height={30} color={"white"}/>
                        <p>Login</p>
                    </button>
                </form>
            </div>
            <div className="register-container">
                <h4>New here?</h4>
                <button className="signup-btn" onClick={goToSignUpButtonHandler}>
                    <RegisterIcon width={30} height={30} color={"white"}/>
                    <p>Sign up</p>
                </button>
            </div>

        </div>

    );
}

export default Login;