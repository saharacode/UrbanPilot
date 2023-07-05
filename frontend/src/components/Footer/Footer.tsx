import React, {Dispatch, SetStateAction} from 'react';
import './Footer.css';
import {LocationInfo} from "../../model/LocationInfo";
import EditLocationPopUp from "../EditLocationPopUp/EditLocationPopUp";

type Props ={
    onSubmitHandler: (values:LocationInfo) => Promise<void>;
    initialValues: LocationInfo;
    setLocations?:Dispatch<SetStateAction<LocationInfo[]>>;
    getAllLocationsForUser:() => Promise<void>;
}

function Footer(props:Props) {
    function getLocationsButtonHandler() {
        // eslint-disable-next-line
        props.getAllLocationsForUser();
    }

    return (
        <div>
            <nav className="nav-footer">
                <button className="footer-btn" onClick={getLocationsButtonHandler}>{"Get locations"}</button>
                <EditLocationPopUp
                    onSubmitHandler={props.onSubmitHandler}
                    initialValues={props.initialValues}
                    setLocations={props.setLocations}
                    submitButtonName={"Add location"}
                />
            </nav>
        </div>
    );
}

export default Footer;