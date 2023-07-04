import React from 'react';
import {useNavigate} from "react-router-dom";
import {User} from "../../model/User";
import Header from "../Header/Header";

type Props = {
    userDetails: User;
}

function Profilepage(props:Props) {
    const nav = useNavigate();

    function backButtonHandler() {
        nav("/mainpage");
    }

    return (
        <div>
            <Header></Header>
            <div>
                <h2>Profile</h2>
                <h3>Hello {props.userDetails.username}</h3>
                <div>
                    <h6>Full name: {props.userDetails.fullname}</h6>
                    <h6>E-Mail: {props.userDetails.email}</h6>
                    <h6>Homecity: {props.userDetails.homecity}</h6>
                </div>
                <button onClick={backButtonHandler}>Back</button>
            </div>
        </div>
    );
}

export default Profilepage;