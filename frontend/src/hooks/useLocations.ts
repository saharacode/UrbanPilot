import axios from "axios";
import {useState} from "react";
import {LocationInfo} from "../model/LocationInfo";

export default function UseLocations() {
    const [locations, setLocations] = useState<LocationInfo[]>([]);

    function getAllLocationsForUser(){
        return axios.get(`/locations/all`)
            .then(response => {
                setLocations(response.data)
            });
    }
    return {getAllLocationsForUser, locations, setLocations}
}