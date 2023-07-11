import React, {Dispatch, SetStateAction} from 'react';
import "./LocationConfirmationWindow.css";
import {SaveIcon} from "../../../../icons/save-icon";
import {CloseIcon} from "../../../../icons/close-icon";

type Props={
    newLocationCoordinates: { lat: number; lng: number; };
    setLocationOnClickActive: Dispatch<SetStateAction<boolean>>;
    setOpenAddLocationPopup: Dispatch<SetStateAction<boolean>>;
    setOpenLocationInput: Dispatch<SetStateAction<boolean>>;
}

function LocationConfirmationWindow(props:Props) {
    function closeButtonHandler() {
        props.setLocationOnClickActive((prevState) => !prevState);
        props.setOpenAddLocationPopup((prevState) => !prevState);
    }

    function confirmButtonHandler() {
        props.setLocationOnClickActive(false);
        props.setOpenAddLocationPopup(false);
        props.setOpenLocationInput((prevState) => !prevState);
    }

    return (
        <div className="locationConfirmationWindow-container">
            <h3>Confirm Location</h3>
            <div className={"locationConfirmationWindow-content"}>
                <h5>Would you like to create a new Location with the chosen coordinates?</h5>
                <div>
                    <h5>Lat {props.newLocationCoordinates.lat}</h5>
                    <h5>Lng {props.newLocationCoordinates.lng}</h5>
                </div>
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