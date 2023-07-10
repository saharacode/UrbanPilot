import React from 'react';
import {useNavigate} from "react-router-dom";
import "./LandingPage.css"
import UrbanPilotLogo from "../../images/UrbanPilotLogo.png";
import {LoginIcon} from "../../icons/login-icon";

function LandingPage() {
    const nav = useNavigate();

    function goTologinButtonHandler() {
        nav("/login");
    }

    return (
        <div className="landingpage-container">
            <img className="landingpage-logo" src={UrbanPilotLogo} alt={"UrbanPilotLogo"}/>
            <h3>Discover. Share. Conquer the urban jungle.</h3>
            <button className="continueToLogin-btn" onClick={goTologinButtonHandler}>
                <LoginIcon width={30} height={30} color={"white"}/>
                <p>Continue to login</p>
            </button>
        </div>

    );
}

export default LandingPage;