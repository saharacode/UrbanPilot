import React, {Dispatch, SetStateAction, useState} from 'react';
import Mapcomponent from "../Mapcomponent/Mapcomponent";
import {LocationInfo} from "../../model/LocationInfo";
import {User} from "../../model/User";
import Header from "../Header/Header";
import './Mainpage.css';
import Footer from "../Footer/Footer";
import LocationConfirmationWindow from "../LocationConfirmationWindow/LocationConfirmationWindow";
import EditLocationPopUp from "../EditLocationPopUp/EditLocationPopUp";
import LocationFilterWindow from "../LocationFilterWindow/LocationFilterWindow";

type Props = {
    userDetails: User;
    postLogout: () => Promise<void>;
    getUserDetails: () => Promise<void>;
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
    const [clickNewLocation, setClickNewLocation] = useState(false);
    const [confirmNewLocation, setConfirmNewLocation] = useState(false);
    const [addLocation, setAddLocation] = useState(false);
    const [editLocation, setEditLocation] = useState(false);
    const [filter,setFilter] = useState(false);
    const [filteredElements,setFilteredElements] = useState<string[]>([])

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
                          clickNewLocation={clickNewLocation}
                          setClickNewLocation={setClickNewLocation}
                          setConfirmNewLocation={setConfirmNewLocation}
                          setEditLocation={setEditLocation}
                          editLocation={editLocation}
                          filteredElements={filteredElements}
            />
            {confirmNewLocation ?
                <LocationConfirmationWindow
                    newLocationCoordinates={newLocationCoordinates}
                    setClickNewLocation={setClickNewLocation}
                    setConfirmNewLocation={setConfirmNewLocation}
                    setAddLocation={setAddLocation}
                />
                : <></>}
            {filter ?
                <LocationFilterWindow
                    setFilter={setFilter}
                    setFilteredElements={setFilteredElements}
                />
                : <></>}
            {addLocation ?
                <EditLocationPopUp
                    onSubmitHandler={(values: LocationInfo) => props.postNewLocation(values, props.setLocations)}
                    initialValues={initialValues}
                    submitButtonName={"Add location"}
                    setBooleanToClosePopup={setAddLocation}
                />
                : <></>
            }
            {confirmNewLocation || addLocation || editLocation || filter?
                <></>
                : <Footer
                    clickNewLocation={clickNewLocation}
                    setClickNewLocation={setClickNewLocation}
                    setFilter={setFilter}
                />
            }
        </div>
    );
}

export default Mainpage;