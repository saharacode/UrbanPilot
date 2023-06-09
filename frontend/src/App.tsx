import React from 'react';
import './App.css';
import HelloWorldComponent from "./components/helloWorldComponent/HelloWorldComponent";
import UrbanPilotLogo from './images/UrbanPilotLogo.png';
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="App">

        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/hello" element={<HelloWorldComponent/>}/>
        </Routes>

    </div>
  );
}

export default App;
