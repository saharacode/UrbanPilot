import React from 'react';
import './App.css';
import HelloWorldComponent from "./components/helloWorldComponent/HelloWorldComponent";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import useUser from "./hooks/useUser";

function App() {
    const {postLogin} = useUser();

    return (
    <div className="App">

        <Routes>
            <Route path="/" element={<Login postLogin={postLogin}/>}/>
            <Route path="/hello" element={<HelloWorldComponent/>}/>
        </Routes>

    </div>
  );
}

export default App;
