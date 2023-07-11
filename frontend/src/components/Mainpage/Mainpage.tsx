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
    newLocationCoordinates: { lat: number; lng: number; };
    setNewLocationCoordinates: Dispatch<SetStateAction<{ lat: number; lng: number; }>>;
    locationOnClickActive: boolean;
    setLocationOnClickActive: Dispatch<SetStateAction<boolean>>;
}

function Mainpage(props:Props) {
    const [openAddLocationPopup, setOpenAddLocationPopup] = useState(false);
    const [openLocationInput, setOpenLocationInput] = useState(false);
    const [openEditLocationInput, setOpenEditLocationInput] = useState(false);

    const initialValues:LocationInfo = {
        locationId: "",
        locationName: "",
        locationDescription: "",
        locationType: "",
        locationCity: "",
        locationLatCoordinate: props.newLocationCoordinates.lat,
        locationLngCoordinate: props.newLocationCoordinates.lng
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
                          setNewLocationCoordinates={props.setNewLocationCoordinates}
                          locationOnClickActive={props.locationOnClickActive}
                          setOpenAddLocationPopup={setOpenAddLocationPopup}
                          setLocationOnClickActive={props.setLocationOnClickActive}
                          setOpenEditLocationInput={setOpenEditLocationInput}
                          openEditLocationInput={openEditLocationInput}
            />
            {openAddLocationPopup ?
                <LocationConfirmationWindow
                    newLocationCoordinates={props.newLocationCoordinates}
                    setLocationOnClickActive={props.setLocationOnClickActive}
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
                    setLocationOnClickActive={props.setLocationOnClickActive}
                    locationOnClickActive={props.locationOnClickActive}
                />
            }


        </div>
    );
}

export default Mainpage;