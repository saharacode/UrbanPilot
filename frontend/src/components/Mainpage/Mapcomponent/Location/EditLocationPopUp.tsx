import React, {Dispatch, SetStateAction} from 'react';
import Popup from "reactjs-popup";
import {Field, Form, Formik} from "formik";
import {LocationInfo} from "../../../../model/LocationInfo";
import axios from "axios";

type Props = {
    locationDetails:LocationInfo;
    setLocations: Dispatch<SetStateAction<LocationInfo[]>>;
    user?: string;
}

function EditLocationPopUp(props:Props) {
    async function saveButtonHandler(values:LocationInfo) {
        if (props.user !== undefined){
            const response = await axios.put(`/locations/edit`,values);
            props.setLocations((locations)=>{
                return [...locations.map((location) =>{
                    if (location.locationId ===response.data.locationId){
                        return response.data;
                    } else {
                        return location;
                    }
                })]
            });
        }
    }

    return (
        <div>
            <Popup trigger={<button>Edit</button>}>
                <div className="popupStyle">
                    <h3>Edit Location</h3>
                    <div className="registerFormContainer">
                        <Formik
                            initialValues={{
                                locationId: props.locationDetails.locationId,
                                locationName: props.locationDetails.locationName,
                                locationDescription: props.locationDetails.locationDescription,
                                locationType: props.locationDetails.locationType,
                                locationCity: props.locationDetails.locationCity,
                                locationLatCoordinate: props.locationDetails.locationLatCoordinate,
                                locationLngCoordinate: props.locationDetails.locationLngCoordinate
                            }}
                            onSubmit={(values:LocationInfo) => saveButtonHandler(values)}
                        >
                            <Form>
                                <div className="inputAndLabel">
                                    <label>Name:</label>
                                    <Field name="locationName" type="text"/>
                                </div>
                                <div className="inputAndLabel">
                                    <label>Description:</label>
                                    <Field name="locationDescription" type="text"/>
                                </div>
                                <div className="inputAndLabel">
                                    <label>Type:</label>
                                    <Field name="locationType" type="text"/>
                                </div>
                                <div className="inputAndLabel">
                                    <label>City:</label>
                                    <Field name="locationCity" type="text"/>
                                </div>
                                <div className="inputAndLabel">
                                    <label>Lat Coordinate:</label>
                                    <Field name="locationLatCoordinate" type="number"/>
                                </div>
                                <div className="inputAndLabel">
                                    <label>Lng Coordinate:</label>
                                    <Field name="locationLngCoordinate" type="number"/>
                                </div>
                                <button type="submit">Save</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </Popup>
        </div>
    );
}

export default EditLocationPopUp;