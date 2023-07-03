import axios from "axios";
import {Dispatch, SetStateAction} from "react";
import {LocationInfo} from "../model/LocationInfo";

export default function UseAddLocation() {
    const initialValues:LocationInfo = {
        locationId: "",
        locationName: "",
        locationDescription: "",
        locationType: "",
        locationCity: "",
        locationLatCoordinate: 0.0,
        locationLngCoordinate: 0.0
    }

    function postNewLocation(newLocation:LocationInfo, setLocations:Dispatch<SetStateAction<LocationInfo[]>>){
        return axios.post(`/locations/add`,newLocation)
            .then(response => {
                setLocations((locations)=>[...locations, response.data]);
            });
    }
    return {postNewLocation, initialValues}
}