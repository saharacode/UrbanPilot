import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {User} from "../../model/User";

type Props = {
    user?: string;
}

function Profilepage(props:Props) {
    const nav = useNavigate();

    function backButtonHandler() {
        nav("/mainpage");
    }

    return (
        <div>
            <div>
                <h2>Profile</h2>
                <h3>Hello {props.user}</h3>
                <button onClick={backButtonHandler}>Back</button>
            </div>
        </div>
    );
}

export default Profilepage;