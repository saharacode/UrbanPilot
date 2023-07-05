import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import UrbanPilotLogo from "../../images/UrbanPilotLogo.png";
import ProfileIcon from "../../images/dropdown-icons/profile.png"
import LogoutIcon from "../../images/dropdown-icons/logout.png"
import './Header.css';
import {LocationInfo} from "../../model/LocationInfo";
import {User} from "../../model/User";
import {useNavigate} from "react-router-dom";

type Props ={
    userDetails: User;
    postLogout: () => Promise<void>;
    setUser: Dispatch<SetStateAction<string | undefined>>;
    setLocations: Dispatch<SetStateAction<LocationInfo[]>>;
    setUserDetails: Dispatch<SetStateAction<User>>;
    emptyUser: User;
}

function Header(props:Props) {
    const nav = useNavigate();
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

    function toggleProfileDropdown() {
        setProfileDropdownOpen((prevState) => !prevState);
    }

    function logoutButtonHandler() {
        // eslint-disable-next-line
        props.postLogout();
        props.setUserDetails(props.emptyUser);
        props.setUser(undefined);
        props.setLocations([]);
        nav("/");
    }

    return (
        <div>
            <nav className="nav-header">
                <img className="logo" src={UrbanPilotLogo} alt={"UrbanPilotLogo"}/>
                <h5 className="dropdown-icon" onClick={toggleProfileDropdown}>Menu</h5>

                <div className={`dropdown-wrap ${isProfileDropdownOpen ? "open-menu" : ""}`} id="profileDropdown">
                    <div className="dropdown">
                        <div className="userinfo">
                            <h5>Hello {props.userDetails.username}!</h5>
                            <h6>Full name: {props.userDetails.fullname}</h6>
                            <h6>E-Mail: {props.userDetails.email}</h6>
                            <h6>Homecity: {props.userDetails.homecity}</h6>
                        </div>
                        <hr></hr>
                        <a href="#" className="dropdown-link">
                            <img src={ProfileIcon} alt={"Profile Icon"}/>
                            <p>Profile</p>
                        </a>
                        <a href="#" className="dropdown-link" onClick={logoutButtonHandler}>
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