import React, {Dispatch, SetStateAction} from 'react';
import Popup from "reactjs-popup";
import {Field, Form, Formik} from "formik";
import {LocationInfo} from "../../model/LocationInfo";
import * as Yup from "yup"
import './Popup.css';

type Props = {
    onSubmitHandler: (values:LocationInfo) => Promise<void>;
    initialValues: LocationInfo;
    setLocations?:Dispatch<SetStateAction<LocationInfo[]>>;
    submitButtonName:string;
    triggerButton:React.ReactElement;
}

function EditLocationPopUp(props:Props) {
    const locationSchema = Yup.object().shape({
        locationName: Yup.string()
            .required('Required'),
        locationType: Yup.string()
            .required('Required'),
        locationCity: Yup.string()
            .required('Required'),
        locationLatCoordinate: Yup.number()
            .required('Required'),
        locationLngCoordinate: Yup.number()
            .required('Required')
    });

    return (
        <Popup trigger={props.triggerButton}>
            <div className="popupStyle">
                <h3>{props.submitButtonName}</h3>
                <div className="registerFormContainer">
                    <Formik
                        initialValues={props.initialValues}
                        validationSchema={locationSchema}
                        onSubmit={(values:LocationInfo) => props.onSubmitHandler(values)}
                    >
                        {({ errors }) => (
                            <Form>
                                <div className="inputAndLabel">
                                    <label>Name:</label>
                                    <Field name="locationName" type="text"/>
                                </div>
                                <div>
                                    {errors.locationName ? <h5>{errors.locationName}</h5> : <></>}
                                </div>
                                <div className="inputAndLabel">
                                    <label>Description:</label>
                                    <Field name="locationDescription" type="text"/>
                                </div>
                                <div className="inputAndLabel">
                                    <label>Type:</label>
                                    <Field name="locationType" type="text"/>
                                </div>
                                <div>
                                    {errors.locationType ? <h5>{errors.locationType}</h5> : <></>}
                                </div>
                                <div className="inputAndLabel">
                                    <label>City:</label>
                                    <Field name="locationCity" type="text"/>
                                </div>
                                <div>
                                    {errors.locationCity ? <h5>{errors.locationCity}</h5> : <></>}
                                </div>
                                <div className="inputAndLabel">
                                    <label>Lat Coordinate:</label>
                                    <Field name="locationLatCoordinate" type="number"/>
                                </div>
                                <div>
                                    {errors.locationLatCoordinate ? <h5>{errors.locationLatCoordinate}</h5> : <></>}
                                </div>
                                <div className="inputAndLabel">
                                    <label>Lng Coordinate:</label>
                                    <Field name="locationLngCoordinate" type="number"/>
                                </div>
                                <div>
                                    {errors.locationLngCoordinate ? <h5>{errors.locationLngCoordinate}</h5> : <></>}
                                </div>
                                <button type="submit">Save</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </Popup>
    );
}

export default EditLocationPopUp;