import React, {Dispatch, SetStateAction} from 'react';
import {Field, Form, Formik} from "formik";
import {LocationInfo} from "../../model/LocationInfo";
import * as Yup from "yup"
import './EditLocationPopUp.css';
import {SaveIcon} from "../../icons/save-icon";
import {CloseIcon} from "../../icons/close-icon";

type Props = {
    onSubmitHandler: (values:LocationInfo) => Promise<void>;
    initialValues: LocationInfo;
    submitButtonName:string;
    setBooleanToClosePopup: Dispatch<SetStateAction<string>>;
}

function EditLocationPopUp(props:Props) {
    const locationSchema = Yup.object().shape({
        locationName: Yup.string()
            .required('Required'),
        locationType: Yup.string()
            .oneOf(['Food', 'Bar', 'Sight', 'Nature', 'Art', 'Education', 'Sports', 'Other'], 'Invalid location type')
            .required('Required'),
        locationCity: Yup.string()
            .required('Required'),
        locationLatCoordinate: Yup.number()
            .required('Required'),
        locationLngCoordinate: Yup.number()
            .required('Required')
    });

    function closeButtonHandler() {
        props.setBooleanToClosePopup("");
    }

    return (
        <div className="popupStyle">
            <div className="editLocationPopup-head">
                <h3>{props.submitButtonName}</h3>
                <button className={"icon-btn"} onClick={closeButtonHandler}>
                    <CloseIcon width={30} height={30} color={"white"}/>
                </button>
            </div>
            <div className="editLocation-container">
                <Formik
                    initialValues={props.initialValues}
                    validationSchema={locationSchema}
                    onSubmit={(values:LocationInfo) => {
                        props.onSubmitHandler(values);
                        closeButtonHandler();
                    }}
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
                                <Field name="locationType" as="select" className={"inputFieldLocation"}>
                                    <option value="Food">Food</option>
                                    <option value="Bar">Bar</option>
                                    <option value="Sight">Sight</option>
                                    <option value="Nature">Nature</option>
                                    <option value="Art">Art</option>
                                    <option value="Education">Education</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Other">Other...</option>
                                </Field>
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
    );
}

export default EditLocationPopUp;