import React from 'react';
import './App.css';
import HelloWorldComponent from "./components/helloWorldComponent/HelloWorldComponent";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./components/Login/Login";
import useUser from "./hooks/useUser";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
    const {postLogin, user} = useUser();

    return (
    <div className="App">

        <Routes>
            <Route path="/" element={<Login postLogin={postLogin}/>}/>
            <Route element={<ProtectedRoutes user={user}/>}>
                <Route path="/hello" element={<HelloWorldComponent/>}/>
            </Route>
        </Routes>

    </div>
  );
}

export default App;
