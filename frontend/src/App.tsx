import React from 'react';
import './App.css';
import Mainpage from "./components/Mainpage/Mainpage";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./components/Login/Login";
import useUser from "./hooks/useUser";
import useUserLogout from "./hooks/useUserLogout";
import useRegisterUser from "./hooks/useRegisterUser";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LandingPage from "./components/LandingPage/LandingPage";
import Register from "./components/Register/Register";

function App() {
    const {postLogin, user, userExists, errorMessage} = useUser();
    const {postLogout, logoutConfirmation} = useUserLogout(); // confirmation with toastify open
    const {postRegistration} = useRegisterUser();

    return (
    <div className="App">

        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<Login postLogin={postLogin} userExists={userExists} errormessage={errorMessage}/>}/>
            <Route path="/register" element={<Register postRegistration={postRegistration}/>}/>
            <Route element={<ProtectedRoutes user={user}/>}>
                <Route path="/mainpage" element={<Mainpage postLogout={postLogout}/>}/>
            </Route>
        </Routes>

    </div>
  );
}

export default App;
