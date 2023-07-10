import React, {Dispatch, SetStateAction} from 'react';
import "./LocationConfirmationWindow.css";
import EditLocationPopUp from "../../../EditLocationPopUp/EditLocationPopUp";
import {LocationInfo} from "../../../../model/LocationInfo";
import {SaveIcon} from "../../../../icons/save-icon";

type Props={
    onSubmitHandler: (values:LocationInfo) => Promise<void>;
    setLocations?:Dispatch<SetStateAction<LocationInfo[]>>;
    initialValues: LocationInfo;
    newLocationCoordinates: { lat: number; lng: number; };
}

function LocationConfirmationWindow(props:Props) {
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
            />
        </div>
    );
}

export default LocationConfirmationWindow;