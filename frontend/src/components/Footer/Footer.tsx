import React, {Dispatch, SetStateAction} from 'react';
import './Footer.css';
import {LocationInfo} from "../../model/LocationInfo";
import {AddLocationIcon} from "../../icons/addLocation-icon";

type Props ={
    onSubmitHandler: (values:LocationInfo) => Promise<void>;
    setLocations?:Dispatch<SetStateAction<LocationInfo[]>>;
    setLocationOnClickActive: Dispatch<SetStateAction<boolean>>;
    newLocationCoordinates: { lat: number; lng: number; };
    locationOnClickActive: boolean;
}

function Footer(props:Props) {
    function getCoordinatesOnClick() {
        props.setLocationOnClickActive((prevState) => !prevState);
    }

    return (
        <nav className="nav-footer">

            {props.locationOnClickActive?
                <div>
                    <button className={"icon-btn"} onClick={getCoordinatesOnClick}>
                        <AddLocationIcon width={30} height={30} color={"white"}/>
                    </button>
                    <h5>Please click on the map, where you would like to create a Location!</h5>
                </div>
                :
                <button className={"icon-btn"} onClick={getCoordinatesOnClick}>
                <AddLocationIcon width={30} height={30} color={"white"}/>
                </button>
            }
        </nav>
    );
}

export default Footer;