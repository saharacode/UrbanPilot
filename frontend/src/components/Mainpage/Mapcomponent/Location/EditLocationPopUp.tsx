import React from 'react';
import Popup from "reactjs-popup";
import {Field, Form, Formik} from "formik";
import {LocationInfo} from "../../../../model/LocationInfo";

type Props = {
    locationDetails:LocationInfo;
}

function EditLocationPopUp(props:Props) {
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
                            onSubmit={async (values:LocationInfo) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                alert(JSON.stringify(values, null, 2));
                            }}
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