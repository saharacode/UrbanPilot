import React, {FormEvent, useState} from 'react';
import './Register.css';
import {useNavigate} from "react-router-dom";
import {User} from "../../model/User";

type Props = {
    postRegistration: (newUser:User) => Promise<void>;
}

function Register(props:Props) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordRepeat, setPasswordRepeat] = useState<string>("");
    const [fullname, setFullname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [homecity, setHomecity] = useState<string>("");
    const nav = useNavigate();

    function registerInputHandler(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const newUser:User = {
            username: username,
            password: password,
            fullname: fullname,
            email: email,
            homecity: homecity
        };
        props.postRegistration(newUser)
            .then(()=> nav("/login")
            );
    }


    function goToLoginButtonHandler() {
        nav("/login");
    }

    return (
        <div>
            <h1>Register</h1>
            <h4>Please create a new account:</h4>
            <div className="registerFormContainer">
                <form onSubmit={registerInputHandler} className="registerForm">
                    <div className="inputAndLabel">
                        <label>Username:</label>
                        <input type={"text"} onChange={event => setUsername(event.target.value)}/>
                    </div>
                    <div className="inputAndLabel">
                        <label>E-Mail:</label>
                        <input type={"text"} onChange={event => setEmail(event.target.value)}/>
                    </div>
                    <div className="inputAndLabel">
                        <label>Full name:</label>
                        <input type={"text"} onChange={event => setFullname(event.target.value)}/>
                    </div>
                    <div className="inputAndLabel">
                        <label>Password:</label>
                        <input type={"password"} onChange={event => setPassword(event.target.value)}/>
                    </div>
                    <div className="inputAndLabel">
                        <label>Repeat Password:</label>
                        <input type={"password"} onChange={event => setPasswordRepeat(event.target.value)}/>
                    </div>
                    <div className="inputAndLabel">
                        <label>Your city:</label>
                        <input type={"text"} onChange={event => setHomecity(event.target.value)}/>
                    </div>
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