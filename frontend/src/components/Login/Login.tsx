import React from 'react';
import UrbanPilotLogo from "../../images/UrbanPilotLogo.png";

function Login(props:any) {
    return (
        <div>
            <div>
                <img src={UrbanPilotLogo} alt={"UrbanPilotLogo"} style={{width: '10%'}}/>
                <h3>Discover. Share. Conquer the urban jungle.</h3>
            </div>
            <div>
                <h1>Welcome to Login</h1>
            </div>
        </div>
    );
}

export default Login;