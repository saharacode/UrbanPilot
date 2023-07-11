import React, {Dispatch, SetStateAction, useState} from 'react';
import Mapcomponent from "./Mapcomponent/Mapcomponent";
import {LocationInfo} from "../../model/LocationInfo";
import {User} from "../../model/User";
import Header from "../Header/Header";
import './Mainpage.css';
import Footer from "../Footer/Footer";
import LocationConfirmationWindow from "./Mapcomponent/LocationConfirmationWindow/LocationConfirmationWindow";
import EditLocationPopUp from "../EditLocationPopUp/EditLocationPopUp";

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
}

function Mainpage(props:Props) {
    const [newLocationCoordinates, setNewLocationCoordinates] = useState({ lat: 0.0, lng: 0.0 });
    const [locationOnClickActive, setLocationOnClickActive] = useState(false);
    const [openAddLocationPopup, setOpenAddLocationPopup] = useState(false);
    const [openLocationInput, setOpenLocationInput] = useState(false);
    const [openEditLocationInput, setOpenEditLocationInput] = useState(false);

    const initialValues:LocationInfo = {
        locationId: "",
        locationName: "",
        locationDescription: "",
        locationType: "",
        locationCity: "",
        locationLatCoordinate: newLocationCoordinates.lat,
        locationLngCoordinate: newLocationCoordinates.lng
    }

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
                          setNewLocationCoordinates={setNewLocationCoordinates}
                          locationOnClickActive={locationOnClickActive}
                          setOpenAddLocationPopup={setOpenAddLocationPopup}
                          setLocationOnClickActive={setLocationOnClickActive}
                          setOpenEditLocationInput={setOpenEditLocationInput}
                          openEditLocationInput={openEditLocationInput}
            />
            {openAddLocationPopup ?
                <LocationConfirmationWindow
                    newLocationCoordinates={newLocationCoordinates}
                    setLocationOnClickActive={setLocationOnClickActive}
                    setOpenAddLocationPopup={setOpenAddLocationPopup}
                    setOpenLocationInput={setOpenLocationInput}
                />
                : <></>}
            {openLocationInput ?
                <EditLocationPopUp
                    onSubmitHandler={(values: LocationInfo) => props.postNewLocation(values, props.setLocations)}
                    initialValues={initialValues}
                    submitButtonName={"Add location"}
                    setBooleanToClosePopup={setOpenLocationInput}
                />
                : <></>
            }
            {openAddLocationPopup || openLocationInput || openEditLocationInput?
                <></>
                : <Footer
                    setLocationOnClickActive={setLocationOnClickActive}
                    locationOnClickActive={locationOnClickActive}
                />
            }


        </div>
    );
}

export default Mainpage;