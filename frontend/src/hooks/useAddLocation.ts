import axios from "axios";
import {useState} from "react";
import {LocationInfo} from "../model/LocationInfo";

export default function UseAddLocation() {
    const emptyLocation: LocationInfo = {
        locationId: "",
        locationName: "",
        locationCity: "",
        locationDescription: "",
        locationLatCoordinate: 0.0,
        locationLngCoordinate: 0.0,
        locationType: ""
    };
    const [addedLocation, setAddedLocation] = useState<LocationInfo>(emptyLocation);

    function postNewLocation(username:string, newLocation:LocationInfo){
        return axios.post(`/locations/add/${username}`,newLocation)
            .then(response => {
                setAddedLocation(response.data);
            });
    }

    return {addedLocation, setAddedLocation, postNewLocation}
}