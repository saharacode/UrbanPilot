import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import UrbanPilotLogo from "../../images/UrbanPilotLogo.png";
import './Header.css';
import {LocationInfo} from "../../model/LocationInfo";
import {User} from "../../model/User";
import {useNavigate} from "react-router-dom";
import {MenuIcon} from "../../icons/menu-icon";
import {LogoutIcon} from "../../icons/logout-icon";
import {EmailIcon} from "../../icons/email-icon";
import {CityIcon} from "../../icons/city-icon";
import {NameIcon} from "../../icons/name-icon";

type Props ={
    userDetails: User;
    getUserDetails: () => Promise<void>;
    postLogout: () => Promise<void>;
    setUser: Dispatch<SetStateAction<string | undefined>>;
    setLocations: Dispatch<SetStateAction<LocationInfo[]>>;
    setUserDetails: Dispatch<SetStateAction<User>>;
    emptyUser: User;
    getAllLocationsForUser:() => Promise<void>;
}

function Header(props:Props) {
    const nav = useNavigate();
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(loadUserInformation,[]);

    function loadUserInformation() {
        // eslint-disable-next-line
        props.getUserDetails();
        // eslint-disable-next-line
        props.getAllLocationsForUser();
    }

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
        <nav className="nav-header">
            <img className="logo" src={UrbanPilotLogo} alt={"UrbanPilotLogo"}/>
            <button className="menu-btn" onClick={toggleProfileDropdown}>
                <MenuIcon width={35} height={35} color={"white"}/>
            </button>
            <div className={`dropdown-wrap ${isProfileDropdownOpen ? "open-menu" : ""}`} id="profileDropdown">
                <div className="dropdown">
                    <div className="userinfo">
                        <h3>Hello {props.userDetails.username}!</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <NameIcon width={20} height={20} color={"white"}/>
                                    </td>
                                    <td>{props.userDetails.fullname}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <EmailIcon width={20} height={20} color={"white"}/>
                                    </td>
                                    <td>{props.userDetails.email}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <CityIcon width={20} height={20} color={"white"}/>
                                    </td>
                                    <td>{props.userDetails.homecity}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr></hr>
                    <button className="menu-icon-btn" onClick={logoutButtonHandler}>
                        <LogoutIcon width={30} height={30} color={"white"}/>
                        <p>Logout</p>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Header;