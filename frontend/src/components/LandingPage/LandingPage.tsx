import React from 'react';
import {useNavigate} from "react-router-dom";

function LandingPage(props:any) {
    const nav = useNavigate();

    function goTologinButtonHandler() {
        nav("/login");
    }

    return (
        <div>
            <div>
                <h1>Welcome to UrbanPilot!</h1>
                <button onClick={goTologinButtonHandler}>Go to login</button>
            </div>
        </div>
    );
}

export default LandingPage;