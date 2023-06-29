import React, {Dispatch, SetStateAction} from 'react';
import {Popup} from "react-leaflet";
import {LocationInfo} from "../../../../model/LocationInfo";
import axios from "axios";

type Props = {
    locationDetails:LocationInfo;
    setLocations: Dispatch<SetStateAction<LocationInfo[]>>;
    user?: string;
}

function LocationPopUp(props:Props) {
    async function deleteButtonHandler() {
        if (props.user !== undefined){
            const response = await axios.delete(`/locations/delete/${props.user}/${props.locationDetails.locationId}`);
            props.setLocations((locations)=>{
                return [...locations.filter((location) =>{
                    return location.locationId !==(response.data);
                })]
            });
        }
    }

    return (
        <div>
            <Popup>
                <h3>{props.locationDetails.locationName}</h3>
                <h5>Location Type: {props.locationDetails.locationType}</h5>
                <h5>City: {props.locationDetails.locationCity}</h5>
                <button onClick={deleteButtonHandler}>Delete</button>
            </Popup>
        </div>
    );
}

export default LocationPopUp;