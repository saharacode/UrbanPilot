import React, {Dispatch, SetStateAction} from 'react';
import Popup from "reactjs-popup";
import {Field, Form, Formik} from "formik";
import {LocationInfo} from "../../model/LocationInfo";
import * as Yup from "yup"
import './Popup.css';
import {SaveIcon} from "../../icons/save-icon";

type Props = {
    onSubmitHandler: (values:LocationInfo) => Promise<void>;
    initialValues: LocationInfo;
    setLocations?:Dispatch<SetStateAction<LocationInfo[]>>;
    submitButtonName:string;
    triggerButton:React.ReactElement;
    openPopup: () => void;
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
        <Popup trigger={props.triggerButton} arrow={false} onOpen={props.openPopup}>
            <div className="popupStyle">
                <h3>{props.submitButtonName}</h3>
                <div className="editLocation-container">
                    <Formik
                        initialValues={props.initialValues}
                        validationSchema={locationSchema}
                        onSubmit={(values:LocationInfo) => props.onSubmitHandler(values)}
                    >
                        {({ errors }) => (
                            <Form className="editLocationForm">
                                <div>
                                    <div className="error-container">
                                        <label>Name</label>
                                        {errors.locationName ? <h6>({errors.locationName})</h6> : <></>}
                                    </div>
                                    <Field name="locationName" type="text" className={"inputFieldLocation"}/>
                                </div>
                                <div>
                                    <div className="error-container">
                                        <label>Description</label>
                                    </div>
                                    <Field name="locationDescription" type="text" className={"inputFieldLocation"}/>
                                </div>
                                <div>
                                    <div className="error-container">
                                        <label>Type</label>
                                        {errors.locationType ? <h6>({errors.locationType})</h6> : <></>}
                                    </div>
                                    <Field name="locationType" type="text" className={"inputFieldLocation"}/>
                                </div>
                                <div>
                                    <div className="error-container">
                                        <label>City</label>
                                        {errors.locationCity ? <h6>({errors.locationCity})</h6> : <></>}
                                    </div>
                                    <Field name="locationCity" type="text" className={"inputFieldLocation"}/>
                                </div>
                                <div>
                                    <div className="error-container">
                                        <label>Lat Coordinate</label>
                                        {errors.locationLatCoordinate ? <h6>({errors.locationLatCoordinate})</h6> : <></>}
                                    </div>
                                    <Field name="locationLatCoordinate" type="number" className={"inputFieldLocation"}/>
                                </div>
                                <div>
                                    <div className="error-container">
                                        <label>Lng Coordinate</label>
                                        {errors.locationLngCoordinate ? <h6>({errors.locationLngCoordinate})</h6> : <></>}
                                    </div>
                                    <Field name="locationLngCoordinate" type="number" className={"inputFieldLocation"}/>
                                </div>
                                <button className="signup-btn" type={"submit"}>
                                    <SaveIcon width={30} height={30} color={"green"}/>
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </Popup>
    );
}

export default EditLocationPopUp;