import React from 'react';
import UrbanPilotLogo from "../../images/UrbanPilotLogo.png";
import './Header.css';

function Header() {
    return (
        <div>
            <div className={"logoHeader"}>
                <div className={"logoContainer"}>
                    <img src={UrbanPilotLogo} alt={"UrbanPilotLogo"}/>
                </div>
            </div>
        </div>
    );
}

export default Header;