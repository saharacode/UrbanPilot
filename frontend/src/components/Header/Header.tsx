import React from 'react';
import UrbanPilotLogo from "../../images/UrbanPilotLogo.png";
import ProfileIcon from "../../images/dropdown-icons/profile.png"
import LogoutIcon from "../../images/dropdown-icons/logout.png"
import './Header.css';

function Header() {
    let profileDropdown = document.getElementById("profileDropdown");
    function openProfileDropdown() {
        if(profileDropdown !== null){
            profileDropdown.classList.toggle("open-menu");
        }
    }

    return (
        <div>
            <nav>
                <img className="logo" src={UrbanPilotLogo} alt={"UrbanPilotLogo"}/>
                <h5 className="dropdown-icon" onClick={openProfileDropdown}>Menu</h5>

                <div className="dropdown-wrap" id="profileDropdown">
                    <div className="dropdown">
                        <div className="userinfo">
                            <h4>Johann Dallmann</h4>
                        </div>
                        <hr></hr>
                        <a href="#" className="dropdown-link">
                            <img src={ProfileIcon} alt={"Profile Icon"}/>
                            <p>Profile</p>
                        </a>
                        <a href="#" className="dropdown-link">
                            <img src={LogoutIcon} alt={"Logout Icon"}/>
                            <p>Logout</p>
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;