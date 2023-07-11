import React, {Dispatch, SetStateAction} from 'react';
import './Footer.css';
import {AddLocationIcon} from "../../icons/addLocation-icon";
import {CloseIcon} from "../../icons/close-icon";

type Props ={
    setLocationOnClickActive: Dispatch<SetStateAction<boolean>>;
    locationOnClickActive: boolean;
}

function Footer(props:Props) {
    function getCoordinatesOnClick() {
        props.setLocationOnClickActive((prevState) => !prevState);
    }

    return (
        <nav className="nav-footer">
            {props.locationOnClickActive?
                <div className={"instruction-container"}>
                    <button className={"icon-btn"} onClick={getCoordinatesOnClick}>
                        <CloseIcon width={30} height={30} color={"white"}/>
                    </button>
                    <h5>Please click on the map, where you would like to create a new Location!</h5>
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