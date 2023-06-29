import axios from "axios";
import {Dispatch, SetStateAction, useState} from "react";
import {LocationInfo} from "../model/LocationInfo";

export default function UseAddLocation() {
    function postNewLocation(username:string, newLocation:LocationInfo, setLocations:Dispatch<SetStateAction<LocationInfo[]>>){
        return axios.post(`/locations/add/${username}`,newLocation)
            .then(response => {
                setLocations((locations)=>[...locations, response.data]);
            });
    }
    return {postNewLocation}
}