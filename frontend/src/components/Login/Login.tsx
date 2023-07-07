import React, {FormEvent, useState} from 'react';
import UrbanPilotLogo from "../../images/UrbanPilotLogo.png";
import './Login.css';
import {useNavigate} from "react-router-dom";
import {LoginIcon} from "../../icons/login-icon";

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
                    <input type={"text"} placeholder={"Username..."} onChange={event => setUsername(event.target.value)}/>
                    <input type={"password"} placeholder={"Password..."} onChange={event => setPassword(event.target.value)}/>
                    <button className="login-btn" type={"submit"}>
                        <LoginIcon width={30} height={30} color={"white"}/>
                    </button>
                </form>
            </div>
            <div className="register-container">
                <h4>New here?</h4>
                <button onClick={goToSignUpButtonHandler}>Sign up</button>
            </div>
        </div>

    );
}

export default Login;