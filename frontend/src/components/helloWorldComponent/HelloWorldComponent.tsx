import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

type Props = {
    postLogout: () => Promise<void>;
}

function HelloWorldComponent(props:Props) {
    const [helloString, setHelloString] = useState<string>("emptyString")
    const nav = useNavigate();

    function loadHelloWorldString(){
        axios.get("/api/hello").then(response =>{
            setHelloString(response.data);
        });
    }

    function logoutButtonHandler() {
        props.postLogout();
        nav("/");
    }

    return (
        <div>
            <div>
                <button onClick={loadHelloWorldString}>loadString</button>
                <h2>This Testpage welcomes you with a warm</h2>
                <h1>{helloString}</h1>
                <button onClick={logoutButtonHandler}>Logout</button>
            </div>
        </div>
    );
}

export default HelloWorldComponent;