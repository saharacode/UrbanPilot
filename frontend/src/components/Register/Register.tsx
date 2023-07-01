import React, {Dispatch, SetStateAction} from 'react';
import './Register.css';
import {useNavigate} from "react-router-dom";
import {User} from "../../model/User";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import axios from "axios";

type Props = {
    setUserExists: Dispatch<SetStateAction<boolean>>;
}

function Register(props:Props) {
    const nav = useNavigate();

    const initialValues = {
        username: "",
        password: "",
        passwordRepeat: "",
        fullname: "",
        email: "",
        homecity: ""
    }

    const registerSchema = Yup.object().shape({
        username: Yup.string()
            .required('Required'),
        password: Yup.string()
            .required('Required'),
        passwordRepeat: Yup.string()
            .required('Required')
            .test('passwords-match', 'Passwords must match', function (value) {
                return this.parent.password === value;
            }),
        fullname: Yup.string()
            .required('Required'),
        email: Yup.string()
            .required('Required'),
        homecity: Yup.string()
            .required('Required')
    });

    function registerInputHandler(values:User) {
        axios.post("/user/register",values)
            .then(() => nav("/login"));
        props.setUserExists(true);
    }

    function goToLoginButtonHandler() {
        nav("/login");
    }

    return (
        <div>
            <h1>Register</h1>
            <h4>Please create a new account:</h4>

            <div className="registerFormContainer">
                <Formik
                    initialValues={initialValues}
                    validationSchema={registerSchema}
                    onSubmit={(values:User) => registerInputHandler(values)}
                >
                    {({ errors }) => (
                        <Form>
                            <div className="inputAndLabel">
                                <label>Username:</label>
                                <Field name="username" type="text"/>
                            </div>
                            <div>
                                {errors.username ? <h5>{errors.username}</h5> : <></>}
                            </div>
                            <div className="inputAndLabel">
                                <label>Password:</label>
                                <Field name="password" type="password"/>
                            </div>
                            <div>
                                {errors.password ? <h5>{errors.passwordRepeat}</h5> : <></>}
                            </div>
                            <div className="inputAndLabel">
                                <label>Repeat Password:</label>
                                <Field name="passwordRepeat" type="password"/>
                            </div>
                            <div>
                                {errors.passwordRepeat ? <h5>{errors.passwordRepeat}</h5> : <></>}
                            </div>
                            <div className="inputAndLabel">
                                <label>Fullname:</label>
                                <Field name="fullname" type="text"/>
                            </div>
                            <div>
                                {errors.fullname ? <h5>{errors.fullname}</h5> : <></>}
                            </div>
                            <div className="inputAndLabel">
                                <label>E-Mail:</label>
                                <Field name="email" type="email"/>
                            </div>
                            <div>
                                {errors.email ? <h5>{errors.email}</h5> : <></>}
                            </div>
                            <div className="inputAndLabel">
                                <label>Homecity:</label>
                                <Field name="homecity" type="text"/>
                            </div>
                            <div>
                                {errors.homecity ? <h5>{errors.homecity}</h5> : <></>}
                            </div>
                            <button type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div>
                <h4>Already registered?</h4>
                <button onClick={goToLoginButtonHandler}>Login</button>
            </div>
        </div>
    );
}

export default Register;