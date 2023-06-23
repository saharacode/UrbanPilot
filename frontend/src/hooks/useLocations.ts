import axios from "axios";
import {useState} from "react";
import {User} from "../model/User";
import {LocationInfo} from "../model/LocationInfo";

export default function UseLocations() {
    const [locations, setLocations] = useState<LocationInfo[]>();

    function getAllLocationsForUser(username:string){
        return axios.get(`/locations/all/${username}`)
            .then(response => {
                setLocations(response.data)
            });
    }

    return {getAllLocationsForUser, locations}
}