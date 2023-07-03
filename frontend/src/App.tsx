import React from 'react';
import './App.css';
import Mainpage from "./components/Mainpage/Mainpage";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import useUser from "./hooks/useUser";
import useAddLocation from "./hooks/useAddLocation";
import useUserDetails from "./hooks/useUserDetails";
import useUserLogout from "./hooks/useUserLogout";
import useLocations from "./hooks/useLocations";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LandingPage from "./components/LandingPage/LandingPage";
import Register from "./components/Register/Register";
import Profilepage from "./components/Profilepage/Profilepage";
import Header from "./components/Header/Header";

function App() {
    const {postLogin, user, setUser, userExists, setUserExists, errorMessage} = useUser();
    const {postLogout} = useUserLogout(); // confirmation with toastify open
    const {getUserDetails, userDetails, setUserDetails, emptyUser} = useUserDetails();
    const {getAllLocationsForUser, locations, setLocations} = useLocations();
    const {postNewLocation, initialValues} = useAddLocation();

    return (
    <div className="App">

        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/" element={<Header/>}/>
            <Route path="/login" element={<Login postLogin={postLogin}
                                                 userExists={userExists}
                                                 errormessage={errorMessage}/>}/>
            <Route path="/register" element={<Register setUserExists={setUserExists}/>}/>
            <Route element={<ProtectedRoutes user={user}/>}>
                <Route path="/mainpage" element={<Mainpage postLogout={postLogout}
                                                           getUserDetails={getUserDetails}
                                                           user={user}
                                                           setUser={setUser}
                                                           locations={locations}
                                                           getAllLocationsForUser={getAllLocationsForUser}
                                                           setUserDetails={setUserDetails} emptyUser={emptyUser}
                                                           setLocations={setLocations}
                                                           postNewLocation={postNewLocation}
                                                           initialValues={initialValues}/>}/>
                <Route path="/profile" element={<Profilepage userDetails={userDetails}/>}/>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
