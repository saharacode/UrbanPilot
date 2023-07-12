import React, {Dispatch, SetStateAction} from 'react';
import "./LocationFilterWindow.css";
import {SaveIcon} from "../../icons/save-icon";
import {CloseIcon} from "../../icons/close-icon";
import {CoordinatesIcon} from "../../icons/coordinates-icon";

type Props={
    setFilter: Dispatch<SetStateAction<boolean>>;
}

function LocationFilterWindow(props:Props) {
    function closeButtonHandler() {
        props.setFilter((prevState) => !prevState);
    }

    function confirmButtonHandler() {
    }

    return (
        <div className="locationFilterWindow-container">
            <div className="editLocationPopup-head">
                <h3>Filter Locations</h3>
                <button className={"icon-btn"} onClick={closeButtonHandler}>
                    <CloseIcon width={30} height={30} color={"white"}/>
                </button>
            </div>
            <div className="locationFilterWindow-content">
                <h5>Please select which locationtype you want to display.</h5>
                <div>
                    <h5>here comes the selection</h5>
                </div>
                <button className={"icon-btn"} onClick={confirmButtonHandler}>
                    <SaveIcon width={30} height={30} color={"green"}/>
                </button>
            </div>
        </div>
    );
}

export default LocationFilterWindow;