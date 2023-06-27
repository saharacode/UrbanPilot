import React from 'react';
import {Popup} from "react-leaflet";
import {LocationInfo} from "../../../../model/LocationInfo";

type Props = {
    locationDetails:LocationInfo;
}

function LocationPopUp(props:Props) {
    return (
        <div>
            <Popup>
                <h3>{props.locationDetails.locationName}</h3>
                <h5>Location Type: {props.locationDetails.locationType}</h5>
                <h5>City: {props.locationDetails.locationCity}</h5>
            </Popup>
        </div>
    );
}

export default LocationPopUp;