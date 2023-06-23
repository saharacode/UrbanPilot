import React from 'react';
import "./Map.css";
import {MapContainer, TileLayer, Marker} from "react-leaflet";
import L, {Icon} from "leaflet";
import "leaflet/dist/leaflet.css";
import {LocationInfo} from "../../model/LocationInfo";
import LocationPopUp from "./Location/LocationPopUp";

function Map() {
    const defaultCoordinates: L.LatLngLiteral = { lat: 52.520008, lng: 13.404954 };
    const locations:LocationInfo[] = [
        {
            locationName: "Location 1 ",
            locationCity: "Default city",
            locationCoordinates: { lat: 52.520008, lng: 13.404954 },
            locationType: "Other",
        },
        {
            locationName: "Location 2",
            locationCity: "Default city",
            locationCoordinates: { lat: 52.53008, lng: 13.424954 },
            locationType: "Other",
        },
        {
            locationName: "Location 3",
            locationCity: "Default city",
            locationCoordinates: { lat: 52.6008, lng: 13.4954 },
            locationType: "Restaurant",
        }
    ]
    const customIcon = new Icon({
        iconUrl: require("../../images/markers/marker_standard.png"),
        iconSize: [38,38]
    })

    return (
        <div>
            <div>
                <h4>Here comes the map.</h4>
            </div>
            <MapContainer center={defaultCoordinates} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map(location =>{
                    return <Marker position={location.locationCoordinates} icon={customIcon}>
                        <LocationPopUp locationDetails={location}/>
                    </Marker>
                })}
            </MapContainer>

        </div>
    );
}

export default Map;