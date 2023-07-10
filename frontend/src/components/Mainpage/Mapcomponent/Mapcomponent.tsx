import React, {Dispatch, SetStateAction, useState} from 'react';
import "./Mapcomponent.css";
import {MapContainer, TileLayer, Marker, useMapEvents} from "react-leaflet";
import L, {Icon} from "leaflet";
import "leaflet/dist/leaflet.css";
import {LocationInfo} from "../../../model/LocationInfo";
import LocationPopUp from "./Location/LocationPopUp";

type Props = {
    locations: LocationInfo[];
    setLocations: Dispatch<SetStateAction<LocationInfo[]>>;
}

function Mapcomponent(props:Props) {
    const defaultCoordinates: L.LatLngLiteral = { lat: 52.520008, lng: 13.404954 };
    const [newLocationCoordinates, setNewLocationCoordinates] = useState({ lat: 0.0, lng: 0.0 })

    const HandleClickMap = () => {
        const map = useMapEvents({
            click(event) {
                setNewLocationCoordinates(event.latlng)
                console.log(newLocationCoordinates)
            }
        })
        return null;
    }

    const customIcon = new Icon({
        iconUrl: require("../../../images/markers/marker_standard.png"),
        iconSize: [38,38]
    })

    return (
        <MapContainer center={defaultCoordinates} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {props.locations.map(location =>{
                return <Marker
                    key={location.locationId}
                    position={{ lat: location.locationLatCoordinate, lng: location.locationLngCoordinate }}
                    icon={customIcon}>
                    <LocationPopUp locationDetails={location}
                                   setLocations={props.setLocations}
                                   />
                </Marker>
            })}
            <HandleClickMap/>
        </MapContainer>
    );
}

export default Mapcomponent;