import React, {Dispatch, SetStateAction} from 'react';
import {useNavigate} from "react-router-dom";
import Mapcomponent from "./Mapcomponent/Mapcomponent";
import {LocationInfo} from "../../model/LocationInfo";
import {User} from "../../model/User";
import Header from "../Header/Header";
import './Mainpage.css';
import Footer from "../Footer/Footer";

type Props = {
    postLogout: () => Promise<void>;
    getUserDetails: () => Promise<void>;
    user?: string;
    setUser: Dispatch<SetStateAction<string | undefined>>;
    locations: LocationInfo[];
    setLocations: Dispatch<SetStateAction<LocationInfo[]>>;
    getAllLocationsForUser: () => Promise<void>;
    setUserDetails: Dispatch<SetStateAction<User>>;
    emptyUser: User;
    postNewLocation: (newLocation: LocationInfo, setLocations: Dispatch<SetStateAction<LocationInfo[]>>) => Promise<void>;
    initialValues: LocationInfo;
}

function Mainpage(props:Props) {
    const nav = useNavigate();

    function logoutButtonHandler() {
        // eslint-disable-next-line
        props.postLogout();
        props.setUserDetails(props.emptyUser);
        props.setUser(undefined);
        props.setLocations([]);
        nav("/");
    }

    function profileButtonHandler() {
        // eslint-disable-next-line
        props.getUserDetails();
        nav("/profile");
    }

    return (
        <div className="general-page-frame">
            <Header></Header>
            <div className="mainpage-content">
                <div>
                    <button onClick={profileButtonHandler}>Profile</button>
                    <button onClick={logoutButtonHandler}>Logout</button>
                </div>
                <Mapcomponent locations={props.locations}
                              setLocations={props.setLocations}
                />
            </div>
            <Footer
                onSubmitHandler={(values: LocationInfo) => props.postNewLocation(values, props.setLocations)}
                initialValues={props.initialValues}
                setLocations={props.setLocations}
                getAllLocationsForUser={props.getAllLocationsForUser}
            />
        </div>
    );
}

export default Mainpage;