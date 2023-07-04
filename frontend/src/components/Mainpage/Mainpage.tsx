import React, {Dispatch, SetStateAction} from 'react';
import {useNavigate} from "react-router-dom";
import Mapcomponent from "./Mapcomponent/Mapcomponent";
import {LocationInfo} from "../../model/LocationInfo";
import {User} from "../../model/User";
import EditLocationPopUp from "../EditLocationPopUp/EditLocationPopUp";
import Header from "../Header/Header";
import './Mainpage.css';

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

    function getLocationsButtonHandler() {
        // eslint-disable-next-line
        props.getAllLocationsForUser();
    }

    return (
        <div>
            <Header></Header>
            <div className="mainpage-content">
                <div>
                    <h2>Welcome to the mainpage</h2>
                    <button onClick={profileButtonHandler}>Profile</button>
                    <button onClick={logoutButtonHandler}>Logout</button>
                    <button onClick={getLocationsButtonHandler}>Get locations</button>
                </div>
                <div>
                    <EditLocationPopUp
                        onSubmitHandler={(values: LocationInfo) => props.postNewLocation(values, props.setLocations)}
                        initialValues={props.initialValues}
                        setLocations={props.setLocations}
                        submitButtonName={"Add Location"}
                    />

                </div>
                <Mapcomponent locations={props.locations}
                              setLocations={props.setLocations}
                />
            </div>

        </div>
    );
}

export default Mainpage;