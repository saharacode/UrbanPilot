import {useState} from "react";


export default function UseGetPositionOnClick() {
    const [newLocationCoordinates, setNewLocationCoordinates] = useState({ lat: 0.0, lng: 0.0 });
    const [locationOnClickActive, setLocationOnClickActive] = useState(false);

    return {newLocationCoordinates, setNewLocationCoordinates, locationOnClickActive, setLocationOnClickActive}
}