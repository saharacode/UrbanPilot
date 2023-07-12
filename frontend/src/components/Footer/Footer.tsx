import React, {Dispatch, SetStateAction} from 'react';
import './Footer.css';
import {AddLocationIcon} from "../../icons/addLocation-icon";
import {CloseIcon} from "../../icons/close-icon";

type Props ={
    clickNewLocation: boolean;
    setClickNewLocation: Dispatch<SetStateAction<boolean>>;
}

function Footer(props:Props) {
    function getCoordinatesOnClick() {
        props.setClickNewLocation((prevState) => !prevState);
    }

    return (
        <nav className="nav-footer">
            {props.clickNewLocation?
                <div className={"instruction-container"}>
                    <button className={"icon-btn"} onClick={getCoordinatesOnClick}>
                        <CloseIcon width={30} height={30} color={"white"}/>
                    </button>
                    <h5>Click on the map, where you would like to create a new Location!</h5>
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