import React, {Dispatch, SetStateAction} from 'react';
import {Popup} from "react-leaflet";
import {LocationInfo} from "../../../../model/LocationInfo";
import axios from "axios";
import EditLocationPopUp from "../../../EditLocationPopUp/EditLocationPopUp";
import './LocationPopUp.css';
import {EditLocationIcon} from "../../../../icons/editLocation-icon";
import {DeleteLocationIcon} from "../../../../icons/deleteLocation-icon";

type Props = {
    locationDetails:LocationInfo;
    setLocations: Dispatch<SetStateAction<LocationInfo[]>>;
}

function LocationPopUp(props:Props) {
    async function deleteButtonHandler() {
        const response = await axios.delete(`/locations/delete/${props.locationDetails.locationId}`);
        props.setLocations((locations)=>{
            return [...locations.filter((location) =>{
                return location.locationId !==(response.data);
            })]
        });
    }

    async function saveButtonHandler(values:LocationInfo) {
        const response = await axios.put(`/locations/edit`,values);
        props.setLocations((locations)=>{
            return [...locations.map((location) =>{
                if (location.locationId ===response.data.locationId){
                    return response.data;
                } else {
                    return location;
                }
            })]
        });
    }

    const initialValues:LocationInfo = {
        locationId: props.locationDetails.locationId,
        locationName: props.locationDetails.locationName,
        locationDescription: props.locationDetails.locationDescription,
        locationType: props.locationDetails.locationType,
        locationCity: props.locationDetails.locationCity,
        locationLatCoordinate: props.locationDetails.locationLatCoordinate,
        locationLngCoordinate: props.locationDetails.locationLngCoordinate
    }

    return (
        <Popup>
            <h3>{props.locationDetails.locationName}</h3>
            <hr></hr>
            <div>
                <div className="locationDetails-wrapper">
                    <div className="locationDetails">
                        <h5>Location Type:</h5>
                        <h5> {props.locationDetails.locationType}</h5>
                    </div>
                    <div className="locationDetails">
                        <h5>City:</h5>
                        <h5> {props.locationDetails.locationCity}</h5>
                    </div>
                    <div className="locationDetails">
                        <h5>Description:</h5>
                        <h5> {props.locationDetails.locationDescription}</h5>
                    </div>
                    <h5>Lat: {props.locationDetails.locationLatCoordinate}, Lng: {props.locationDetails.locationLngCoordinate}</h5>
                </div>
            </div>
            <hr></hr>
            <div className="locationPopup-buttons">
                <EditLocationPopUp onSubmitHandler={(values: LocationInfo) => saveButtonHandler(values)}
                                   initialValues={initialValues}
                                   submitButtonName={"Edit Location"}
                                   triggerButton={<button className={"icon-btn"}>
                                       <EditLocationIcon width={30} height={30} color={"black"}/>
                                   </button>}
                />
                <button onClick={deleteButtonHandler} className="icon-btn">
                    <DeleteLocationIcon width={30} height={30} color={"red"}/>
                </button>
            </div>
        </Popup>
    );
}

export default LocationPopUp;