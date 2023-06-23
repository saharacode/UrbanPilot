import React from 'react';
import {useNavigate} from "react-router-dom";
import Map from "../Map/Map";
import {LocationInfo} from "../../model/LocationInfo";

type Props = {
    postLogout: () => Promise<void>;
    getUserDetails: (username:string) => Promise<void>;
    user?: string;
    locations?: LocationInfo;
}

function Mainpage(props:Props) {
    const nav = useNavigate();

    function logoutButtonHandler() {
        // eslint-disable-next-line
        props.postLogout();
        nav("/");
    }

    function profileButtonHandler() {
        if (props.user !== undefined){
            // eslint-disable-next-line

            props.getUserDetails(props.user);
            nav("/profile");
        }
    }

    return (
        <div>
            <div>
                <h2>Welcome to the mainpage</h2>
                <button onClick={profileButtonHandler}>Profile</button>
                <button onClick={logoutButtonHandler}>Logout</button>
            </div>
            <Map locations={props.locations}/>
        </div>
    );
}

export default Mainpage;