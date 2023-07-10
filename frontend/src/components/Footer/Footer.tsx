import React, {Dispatch, SetStateAction} from 'react';
import './Footer.css';
import {LocationInfo} from "../../model/LocationInfo";
import EditLocationPopUp from "../EditLocationPopUp/EditLocationPopUp";
import {AddLocationIcon} from "../../icons/addLocation-icon";

type Props ={
    onSubmitHandler: (values:LocationInfo) => Promise<void>;
    setLocations?:Dispatch<SetStateAction<LocationInfo[]>>;
    setLocationOnClickActive: Dispatch<SetStateAction<boolean>>;
    newLocationCoordinates: { lat: number; lng: number; };
}

function Footer(props:Props) {
    function getCoordinatesOnClick() {
        props.setLocationOnClickActive((prevState) => !prevState);
    }

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
        <nav className="nav-footer">
            <EditLocationPopUp
                onSubmitHandler={props.onSubmitHandler}
                initialValues={initialValues}
                setLocations={props.setLocations}
                submitButtonName={"Add location"}
                triggerButton={<button className={"icon-btn"}>
                    <AddLocationIcon width={30} height={30} color={"white"}/>
                </button>}
            />
            <button onClick={getCoordinatesOnClick}>Get Coordinates</button>
        </nav>
    );
}

export default Footer;