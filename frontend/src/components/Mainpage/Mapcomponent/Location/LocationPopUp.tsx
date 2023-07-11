import React, {Dispatch, SetStateAction, useState} from 'react';
import {Popup} from "react-leaflet";
import {LocationInfo} from "../../../../model/LocationInfo";
import axios from "axios";
import EditLocationPopUp from "../../../EditLocationPopUp/EditLocationPopUp";
import './LocationPopUp.css';
import {EditLocationIcon} from "../../../../icons/editLocation-icon";
import {DeleteLocationIcon} from "../../../../icons/deleteLocation-icon";
import {CityIcon} from "../../../../icons/city-icon";
import {InformationIcon} from "../../../../icons/information-icon";
import {LocationtypeIcon} from "../../../../icons/locationtype-icon";

type Props = {
    locationDetails:LocationInfo;
    setLocations: Dispatch<SetStateAction<LocationInfo[]>>;
    openEditLocationInput: boolean;
    setOpenEditLocationInput: Dispatch<SetStateAction<boolean>>;
    setOpenAddLocationInput: Dispatch<SetStateAction<boolean>>;
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

    function editButtonHandler() {
        props.setOpenEditLocationInput((prevState:boolean) => !prevState);
        props.setOpenAddLocationInput(false);
    }

    return (
        <div>
            <Popup>
                <h3>{props.locationDetails.locationName}</h3>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <LocationtypeIcon width={20} height={20} color={"black"}/>
                        </td>
                        <td> {props.locationDetails.locationType}</td>
                    </tr>
                    <tr>
                        <td>
                            <CityIcon width={20} height={20} color={"black"}/>
                        </td>
                        <td> {props.locationDetails.locationCity}</td>
                    </tr>
                    <tr>
                        <td>
                            <InformationIcon width={20} height={20} color={"black"}/>
                        </td>
                        <td> {props.locationDetails.locationDescription}</td>
                    </tr>
                    </tbody>
                </table>
                <h5>Lat: {props.locationDetails.locationLatCoordinate}, Lng: {props.locationDetails.locationLngCoordinate}</h5>
                <div className="locationPopup-buttons">
                    <button onClick={editButtonHandler} className="icon-btn">
                        <EditLocationIcon width={30} height={30} color={"black"}/>
                    </button>
                    <button onClick={deleteButtonHandler} className="icon-btn">
                        <DeleteLocationIcon width={30} height={30} color={"red"}/>
                    </button>
                </div>
            </Popup>
            {props.openEditLocationInput?
                <EditLocationPopUp onSubmitHandler={(values: LocationInfo) => saveButtonHandler(values)}
                                   initialValues={initialValues}
                                   submitButtonName={"Edit Location"}
                                   setBooleanToClosePopup={props.setOpenEditLocationInput}
                />:
                <></>
            }
        </div>
    );
}

export default LocationPopUp;