import React, {Dispatch, SetStateAction} from 'react';
import "./Mapcomponent.css";
import {MapContainer, TileLayer, Marker, useMapEvents} from "react-leaflet";
import L, {Icon} from "leaflet";
import "leaflet/dist/leaflet.css";
import {LocationInfo} from "../../model/LocationInfo";
import LocationInformationPopUp from "../LocationInformationPopUp/LocationInformationPopUp";

type Props = {
    locations: LocationInfo[];
    setLocations: Dispatch<SetStateAction<LocationInfo[]>>;
    setNewLocationCoordinates: Dispatch<SetStateAction<{ lat: number; lng: number; }>>;
    clickNewLocation: boolean;
    setClickNewLocation: Dispatch<SetStateAction<boolean>>;
    setConfirmNewLocation: Dispatch<SetStateAction<boolean>>;
    editLocation: boolean;
    setEditLocation: Dispatch<SetStateAction<boolean>>;
}

function Mapcomponent(props:Props) {
    const defaultCoordinates: L.LatLngLiteral = { lat: 52.520008, lng: 13.404954 };

    const HandleClickMap = () => {
        useMapEvents({
            click(event) {
                props.setNewLocationCoordinates(event.latlng);
                props.setConfirmNewLocation((prevState) => !prevState);
                props.setClickNewLocation((prevState) => !prevState);
            }
        })
        return null;
    }

    const customIcon = new Icon({
        iconUrl: require("../../images/markers/marker_standard.png"),
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
                    <LocationInformationPopUp locationDetails={location}
                                              setLocations={props.setLocations}
                                              setEditLocation={props.setEditLocation}
                                              editLocation={props.editLocation}
                                              setConfirmNewLocation={props.setConfirmNewLocation}
                    />
                </Marker>
            })}
            {props.clickNewLocation ? <HandleClickMap/> : <></>}
        </MapContainer>
    );
}

export default Mapcomponent;