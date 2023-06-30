import React from 'react';
import Popup from "reactjs-popup";
import {Field, Form, Formik} from "formik";

type Props = {}

function EditLocationPopUp(props:Props) {
    return (
        <div>
            <Popup trigger={<button>Edit</button>}>
                <div className="popupStyle">
                    <h3>Edit Location</h3>
                    <div className="registerFormContainer">
                        <Formik
                            initialValues={{
                                locationName: "",
                                locationDescription: "testdescription",
                                locationType: "",
                                locationCity: "",
                                locationLatCoordinate: "",
                                locationLngCoordinate: ""
                            }}
                            onSubmit={async (values) => {
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
                                    <Field name="locationLatCoordinate" type="text"/>
                                </div>
                                <div className="inputAndLabel">
                                    <label>Lng Coordinate:</label>
                                    <Field name="locationLngCoordinate" type="text"/>
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