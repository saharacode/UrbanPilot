import React, {Dispatch, SetStateAction, useState} from 'react';
import "./LocationFilterWindow.css";
import {SaveIcon} from "../../icons/save-icon";
import {CloseIcon} from "../../icons/close-icon";

type Props={
    setFilter: Dispatch<SetStateAction<boolean>>;
    setFilteredElements: Dispatch<SetStateAction<string[]>>;
    filteredElements: string[];
    locationtypes: string[];
}

function LocationFilterWindow(props:Props) {
    const [currentSelection, setCurrentSelection] = useState<string[]>(props.filteredElements);

    function closeButtonHandler() {
        props.setFilter((prevState) => !prevState);
    }

    function confirmButtonHandler() {
        props.setFilteredElements(currentSelection);
    }

    function clickCheckboxHandler(locationtype:string) {
        if (currentSelection.includes(locationtype)){
            setCurrentSelection(currentSelection.filter((element)=> (element !== locationtype)))
        } else {
            setCurrentSelection([...currentSelection, locationtype])
        }
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
                <h5>Please select which locationtype you want to display:</h5>
                <div className="checkboxes-container">
                    {
                        props.locationtypes.map((locationtype:string) =>(
                             <label key={locationtype} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    value={locationtype}
                                    checked={currentSelection.includes(locationtype)}
                                    onChange={() => clickCheckboxHandler(locationtype)}
                                    className="checkbox"/>
                                {locationtype}
                            </label>
                        ))
                    }
                </div>
                <button className={"icon-btn"} onClick={confirmButtonHandler}>
                    <SaveIcon width={30} height={30} color={"green"}/>
                </button>
            </div>
        </div>
    );
}

export default LocationFilterWindow;