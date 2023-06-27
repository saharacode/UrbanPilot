import React, {Dispatch, SetStateAction, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Mapcomponent from "../Mapcomponent/Mapcomponent";
import {LocationInfo} from "../../model/LocationInfo";
import {User} from "../../model/User";

type Props = {
    postLogout: () => Promise<void>;
    getUserDetails: (username:string) => Promise<void>;
    user?: string;
    setUser: Dispatch<SetStateAction<string | undefined>>;
    locations?: LocationInfo[];
    setLocations: Dispatch<SetStateAction<LocationInfo[]>>;
    getAllLocationsForUser: (username:string) => Promise<void>;
    setUserDetails: Dispatch<SetStateAction<User>>;
    emptyUser: User;
}

function Mainpage(props:Props) {
    const nav = useNavigate();
    const [enableAddLocation, setEnableAddLocation] = useState(false);

    function logoutButtonHandler() {
        // eslint-disable-next-line
        props.postLogout();
        props.setUserDetails(props.emptyUser);
        props.setUser(undefined);
        props.setLocations([]);
        nav("/");
    }

    function profileButtonHandler() {
        if (props.user !== undefined){
            // eslint-disable-next-line

            props.getUserDetails(props.user);
            nav("/profile");
        }
    }

    function getLocationsButtonHandler() {
        if (props.user !== undefined){
            // eslint-disable-next-line
            props.getAllLocationsForUser(props.user);
        }
    }

    function addLocationButtonHandler() {
        setEnableAddLocation(true);
    }

    return (
        <div>
            <div>
                <h2>Welcome to the mainpage</h2>
                <button onClick={profileButtonHandler}>Profile</button>
                <button onClick={logoutButtonHandler}>Logout</button>
                <button onClick={getLocationsButtonHandler}>Get locations</button>
                <button onClick={addLocationButtonHandler}>Add location</button>
            </div>
            <Mapcomponent
                locations={props.locations}
                enableAddLocation={enableAddLocation}
                setEnableAddLocation={setEnableAddLocation}/>
        </div>
    );
}

export default Mainpage;