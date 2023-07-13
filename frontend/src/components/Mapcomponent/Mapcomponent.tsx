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
    editLocation: string;
    setEditLocation: Dispatch<SetStateAction<string>>;
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
    const urlShadowCollection =["location-icons/locationmarker-red.svg", "location-icons/locationmarker-yellow.svg", "location-icons/locationmarker-blue.svg", "location-icons/locationmarker-green.svg", "location-icons/locationmarker-watermelon.svg", "location-icons/locationmarker-aqua.svg", "location-icons/locationmarker-orange.svg", "location-icons/locationmarker-dark.svg"]
    const iconCollection = urlCollection.map((url, i)=>{
        return new Icon({
            shadowUrl: urlShadowCollection[i],
            shadowAnchor: [25,50],
            shadowSize: [50, 50],
            iconUrl: url,
            iconSize: [26, 26],
            iconAnchor: [13, 46],
        })
    })

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