import axios from "axios";
import {Dispatch, SetStateAction} from "react";
import {LocationInfo} from "../model/LocationInfo";

export default function UseAddLocation() {
    function postNewLocation(newLocation:LocationInfo, setLocations:Dispatch<SetStateAction<LocationInfo[]>>){
        return axios.post(`/locations/add`,newLocation)
            .then(response => {
                setLocations((locations)=>[...locations, response.data]);
            });
    }
    return {postNewLocation}
}