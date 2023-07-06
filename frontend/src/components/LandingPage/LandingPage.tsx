import React from 'react';
import {useNavigate} from "react-router-dom";
import "./LandingPage.css"
import UrbanPilotLogo from "../../images/UrbanPilotLogo.png";
import {LogoutIcon} from "../../icons/logout-icon";

function LandingPage() {
    const nav = useNavigate();

    function goTologinButtonHandler() {
        nav("/login");
    }

    return (
        <div className="landingpage-container">
            <img className="landingpage-logo" src={UrbanPilotLogo} alt={"UrbanPilotLogo"}/>
            <button className="continueToLogin-btn" onClick={goTologinButtonHandler}>
                <p>Go to login</p>
                <LogoutIcon width={30} height={30} color={"white"}/>
            </button>
        </div>

    );
}

export default LandingPage;