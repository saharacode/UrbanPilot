import React, {Dispatch, SetStateAction} from 'react';
import "./LocationConfirmationWindow.css";
import {SaveIcon} from "../../icons/save-icon";
import {CloseIcon} from "../../icons/close-icon";
import {CoordinatesIcon} from "../../icons/coordinates-icon";

type Props={
    newLocationCoordinates: { lat: number; lng: number; };
    setClickNewLocation: Dispatch<SetStateAction<boolean>>;
    setConfirmNewLocation: Dispatch<SetStateAction<boolean>>;
    setAddLocation: Dispatch<SetStateAction<string>>;
}

function LocationConfirmationWindow(props:Props) {
    function closeButtonHandler() {
        props.setClickNewLocation((prevState) => !prevState);
        props.setConfirmNewLocation((prevState) => !prevState);
    }

    function confirmButtonHandler() {
        props.setClickNewLocation(false);
        props.setConfirmNewLocation(false);
        props.setAddLocation(() => "addLocation");
    }

    return (
        <div className="locationConfirmationWindow-container">
            <h3>Confirm Location</h3>
            <div className="locationConfirmationWindow-content">
                <div className="coordinates-container">
                    <CoordinatesIcon width={20} height={20} color={"white"}/>
                    <div>
                        <h5>Lat: {props.newLocationCoordinates.lat}</h5>
                        <h5>Lng: {props.newLocationCoordinates.lng}</h5>
                    </div>
                </div>
                <h5>Would you like to create a new Location with the chosen coordinates?</h5>
                <div className={"locationConfirmation-buttons"}>
                    <button className={"icon-btn"} onClick={confirmButtonHandler}>
                        <SaveIcon width={30} height={30} color={"green"}/>
                    </button>
                    <button className={"icon-btn"} onClick={closeButtonHandler}>
                        <CloseIcon width={30} height={30} color={"red"}/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LocationConfirmationWindow;