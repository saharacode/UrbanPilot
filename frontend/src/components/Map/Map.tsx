import React from 'react';
import "./Map.css";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import L, {Icon, marker} from "leaflet";
import "leaflet/dist/leaflet.css";

function Map() {
    const defaultCoordinates: L.LatLngLiteral = { lat: 52.520008, lng: 13.404954 };
    const locations = [
        {
            coordinates: { lat: 52.520008, lng: 13.404954 },
            popUp: "Location 1"
        },
        {
            coordinates: { lat: 52.53008, lng: 13.424954 },
            popUp: "Location 2"
        },
        {
            coordinates: { lat: 52.6008, lng: 13.4954 },
            popUp: "Location 3"
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
                    return <Marker position={location.coordinates} icon={customIcon}>
                        <Popup>{location.popUp}</Popup>
                    </Marker>
                })}
            </MapContainer>

        </div>
    );
}

export default Map;