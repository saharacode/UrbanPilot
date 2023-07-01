import React, {Dispatch, SetStateAction} from 'react';
import {Popup} from "react-leaflet";
import {LocationInfo} from "../../../../model/LocationInfo";
import axios from "axios";
import EditLocationPopUp from "./EditLocationPopUp";

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
        <div>
            <Popup>
                <h3>{props.locationDetails.locationName}</h3>
                <h5>Location Type: {props.locationDetails.locationType}</h5>
                <h5>City: {props.locationDetails.locationCity}</h5>
                <h5>Lat: {props.locationDetails.locationLatCoordinate}, Lng: {props.locationDetails.locationLngCoordinate}</h5>
                <EditLocationPopUp onSubmitHandler={(values: LocationInfo) => saveButtonHandler(values)}
                                   initialValues={initialValues}
                                   />
                <button onClick={deleteButtonHandler}>Delete</button>
            </Popup>
        </div>
    );
}

export default LocationPopUp;