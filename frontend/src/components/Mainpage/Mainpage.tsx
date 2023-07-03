import React, {Dispatch, SetStateAction} from 'react';
import {useNavigate} from "react-router-dom";
import Mapcomponent from "./Mapcomponent/Mapcomponent";
import {LocationInfo} from "../../model/LocationInfo";
import {User} from "../../model/User";
import AddLocationPopUp from "./AddLocationPopUp/AddLocationPopUp";

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
            <div>
                <h2>Welcome to the mainpage</h2>
                <button onClick={profileButtonHandler}>Profile</button>
                <button onClick={logoutButtonHandler}>Logout</button>
                <button onClick={getLocationsButtonHandler}>Get locations</button>
            </div>
            <div>
                <AddLocationPopUp
                    postNewLocation={props.postNewLocation}
                    setLocations={props.setLocations}/>
            </div>
            <Mapcomponent locations={props.locations}
                          setLocations={props.setLocations}
                          />
        </div>
    );
}

export default Mainpage;