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
    filteredElements: string[];
    locationTypes: string[];
}

function Mapcomponent(props:Props) {
    const defaultCoordinates: L.LatLngLiteral = { lat: 52.520008, lng: 13.404954 };

    const filteredLocations: LocationInfo[] = (props.locations.filter((locationToFilter:LocationInfo)=>(
        props.filteredElements.includes(locationToFilter.locationType)
    )))

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

    const urlCollection = ["/location-icons/food.svg","/location-icons/bar.svg", "/location-icons/sight.svg","/location-icons/nature.svg","/location-icons/art.svg","/location-icons/education.svg","/location-icons/sports.svg","/location-icons/other.svg"];
    const iconCollection = urlCollection.map((url)=>{
        return new Icon({
            iconUrl: url,
            iconSize: [38, 38]
        })
    })
    //const iconMap = Object.fromEntries(props.locationTypes.map((locationtype)=>[locationtype, iconCollection]));
    const iconMap = new Map<string,Icon>();
    props.locationTypes.forEach((locationType, i) => {
        iconMap.set(locationType, iconCollection[i]);
    });

    return (
        <MapContainer center={defaultCoordinates} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredLocations.map((location) =>{
                return <Marker
                    key={location.locationId}
                    position={{ lat: location.locationLatCoordinate, lng: location.locationLngCoordinate }}
                    icon={iconMap.get(location.locationType)}>
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