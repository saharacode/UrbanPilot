import React from 'react';
import {useNavigate} from "react-router-dom";
import {User} from "../../model/User";

type Props = {
    user?: string;
    userDetails?: User;
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
                <h3>Hello {props.userDetails?.username}</h3>
                <h2>Homecity: {props.userDetails?.homecity}</h2>
                <button onClick={backButtonHandler}>Back</button>
            </div>
        </div>
    );
}

export default Profilepage;