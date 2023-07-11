import React, {Dispatch, SetStateAction} from 'react';
import "./LocationConfirmationWindow.css";
import EditLocationPopUp from "../../../EditLocationPopUp/EditLocationPopUp";
import {LocationInfo} from "../../../../model/LocationInfo";
import {SaveIcon} from "../../../../icons/save-icon";
import {CloseIcon} from "../../../../icons/close-icon";

type Props={
    onSubmitHandler: (values:LocationInfo) => Promise<void>;
    setLocations?:Dispatch<SetStateAction<LocationInfo[]>>;
    initialValues: LocationInfo;
    newLocationCoordinates: { lat: number; lng: number; };
    setLocationOnClickActive: Dispatch<SetStateAction<boolean>>;
    setOpenAddLocationPopup: Dispatch<SetStateAction<boolean>>;
}

function LocationConfirmationWindow(props:Props) {
    function closeButtonHandler() {
        props.setLocationOnClickActive((prevState) => !prevState);
        props.setOpenAddLocationPopup((prevState) => !prevState);
    }

    function confirmButtonHandler() {
        //props.setLocationOnClickActive(false);
        //props.setOpenAddLocationPopup(false);
    }

    return (
        <div className="locationConfirmationWindow-container">
            <h5>Would you like to create a new Location at Lat {props.newLocationCoordinates.lat}, Lng {props.newLocationCoordinates.lng}?</h5>
            <EditLocationPopUp
                onSubmitHandler={props.onSubmitHandler}
                initialValues={props.initialValues}
                setLocations={props.setLocations}
                submitButtonName={"Add location"}
                triggerButton={<button className={"icon-btn"}>
                    <SaveIcon width={30} height={30} color={"green"}/>
                </button>}
                openPopup={confirmButtonHandler}
            />
            <button className={"icon-btn"} onClick={closeButtonHandler}>
                <CloseIcon width={30} height={30} color={"red"}/>
            </button>
        </div>
    );
}

export default LocationConfirmationWindow;