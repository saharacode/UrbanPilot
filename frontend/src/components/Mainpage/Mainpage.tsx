import React, {Dispatch, SetStateAction, useEffect} from 'react';
import Mapcomponent from "./Mapcomponent/Mapcomponent";
import {LocationInfo} from "../../model/LocationInfo";
import {User} from "../../model/User";
import Header from "../Header/Header";
import './Mainpage.css';
import Footer from "../Footer/Footer";

type Props = {
    userDetails: User;
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
    return (
        <div className="general-page-frame">
            <Header
                userDetails={props.userDetails}
                getUserDetails={props.getUserDetails}
                postLogout={props.postLogout}
                setUser={props.setUser}
                setUserDetails={props.setUserDetails}
                emptyUser={props.emptyUser}
                setLocations={props.setLocations}
                getAllLocationsForUser={props.getAllLocationsForUser}
            />
            <Mapcomponent locations={props.locations}
                          setLocations={props.setLocations}
            />
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