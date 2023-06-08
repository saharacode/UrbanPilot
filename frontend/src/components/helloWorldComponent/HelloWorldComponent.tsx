import React, {useEffect, useState} from 'react';
import axios from "axios";

function HelloWorldComponent() {
    const [helloString, setHelloString] = useState<string>("emptyString")

    useEffect(loadHelloWorldString,[])

    function loadHelloWorldString(){
        axios.get("/api/hello").then(response =>{
            setHelloString(response.data);
        });
    }

    return (
        <div>
            <div>
                <h2>This Testpage welcomes you with a warm</h2>
                <h1>{helloString}</h1>
            </div>
        </div>
    );
}

export default HelloWorldComponent;