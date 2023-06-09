import React from 'react';
import UrbanPilotLogo from "../../images/UrbanPilotLogo.png";
import './Header.css';

function Header(props:any) {
    return (
        <div>
            <div className={"logoHeader"}>
                <img src={UrbanPilotLogo} alt={"UrbanPilotLogo"} style={{width: '20%'}}/>
                <h3>Here comes a Topbar</h3>
            </div>
        </div>
    );
}

export default Header;