import React from 'react';
import "./Mapcomponent.css";
import {MapContainer, TileLayer, Marker} from "react-leaflet";
import L, {Icon} from "leaflet";
import "leaflet/dist/leaflet.css";
import {LocationInfo} from "../../model/LocationInfo";
import LocationPopUp from "./Location/LocationPopUp";

type Props = {
    locations?: LocationInfo[];
}

function Mapcomponent(props:Props) {
    const defaultCoordinates: L.LatLngLiteral = { lat: 52.520008, lng: 13.404954 };

    const customIcon = new Icon({
        iconUrl: require("../../images/markers/marker_standard.png"),
        iconSize: [38,38]
    })

    return (
        <div>
            <div>
                <h4>Here comes the map.</h4>
            </div>
            {props.locations === undefined ?
                <MapContainer center={defaultCoordinates} zoom={13}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer> :
                <MapContainer center={defaultCoordinates} zoom={13}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {props.locations.map(location =>{
                        return <Marker position={{ lat: location.locationLatCoordinate, lng: location.locationLngCoordinate }} icon={customIcon}>
                            <LocationPopUp locationDetails={location}/>
                        </Marker>
                    })}
                </MapContainer>
            }



        </div>
    );
}

export default Mapcomponent;