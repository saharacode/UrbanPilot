import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

type Props = {
    postLogout: () => Promise<void>;
}

function Mainpage(props:Props) {
    const nav = useNavigate();

    function logoutButtonHandler() {
        props.postLogout();
        nav("/");
    }

    function profileButtonHandler() {
        nav("/profile");
    }

    return (
        <div>
            <div>
                <h2>Welcome to the mainpage</h2>
                <button onClick={profileButtonHandler}>Profile</button>
                <button onClick={logoutButtonHandler}>Logout</button>
            </div>
        </div>
    );
}

export default Mainpage;