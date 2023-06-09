import React from 'react';
import UrbanPilotLogo from "../../images/UrbanPilotLogo.png";
import './Login.css';

function Login(props:any) {
    return (
        <div>
            <div className={"welcomeContainer"}>
                <div className={"welcomeLogoContainer"}>
                    <img src={UrbanPilotLogo} alt={"UrbanPilotLogo"}/>
                </div>
                <h3>Discover. Share. Conquer the urban jungle.</h3>
            </div>
            <div>
                <h1>Welcome to Login</h1>
            </div>
        </div>
    );
}

export default Login;