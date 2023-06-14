import React, {useState} from 'react';
import './Register.css';
import {useNavigate} from "react-router-dom";

type Props = {

}

function Register(props:Props) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const nav = useNavigate();

    function registerInputHandler() {

    }


    function goToLoginButtonHandler() {
        nav("/login");
    }

    return (
        <div>
            <h1>Register</h1>
            <h4>Please create a new account:</h4>
            <div>
                <form onSubmit={registerInputHandler} className="registerForm">
                    <input type={"text"} placeholder={"Username..."} onChange={event => setUsername(event.target.value)}/>
                    <input type={"password"} placeholder={"Password..."} onChange={event => setPassword(event.target.value)}/>
                    <button type={"submit"}>Register</button>
                </form>
            </div>
            <div>
                <h4>Already registered?</h4>
                <button onClick={goToLoginButtonHandler}>Login</button>
            </div>
        </div>
    );
}

export default Register;