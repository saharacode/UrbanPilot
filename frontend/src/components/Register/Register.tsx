import React, {Dispatch, SetStateAction, useState} from 'react';
import './Register.css';
import {useNavigate} from "react-router-dom";
import {User} from "../../model/User";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import {LoginIcon} from "../../icons/login-icon";
import {SubmitIcon} from "../../icons/submit-icon";

type Props = {
    setUserExists: Dispatch<SetStateAction<boolean>>;
}

function Register(props:Props) {
    const nav = useNavigate();
    const usernameGivenErrorMessage = "Username is already given";
    const [usernameGiven, setUsernameGiven] = useState(false)

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
            .then(() => nav("/login"))
            .catch((error) => {
                if(error.response && error.response.status === 409){
                    setUsernameGiven(true);
                    console.error(usernameGivenErrorMessage);
                } else {
                    console.error(error);
                }
            });
        props.setUserExists(true);
        setUsernameGiven(false);
    }

    function goToLoginButtonHandler() {
        nav("/login");
    }

    return (
        <div className="landingpage-container">
            <h1>Register</h1>
            <h4>Please create a new account:</h4>
            {usernameGiven ? <h5>{usernameGivenErrorMessage}</h5> : <></>}
                <Formik
                    initialValues={initialValues}
                    validationSchema={registerSchema}
                    onSubmit={(values:User) => registerInputHandler(values)}
                >
                    {({ errors }) => (
                        <Form className={"registerForm"}>
                            <div>
                                <div className="error-container">
                                    <label>Username</label>
                                    {errors.username ? <h6>({errors.username})</h6> : <></>}
                                </div>
                                    <Field name="username" type="text" className={"inputField"}/>
                            </div>
                            <div>
                                <div className="error-container">
                                    <label>Password</label>
                                    {errors.password ? <h6>({errors.passwordRepeat})</h6> : <></>}
                                </div>
                                <Field name="password" type="password" className={"inputField"}/>
                            </div>
                            <div>
                                <div className="error-container">
                                    <label>Repeat Password</label>
                                    {errors.passwordRepeat ? <h6>({errors.passwordRepeat})</h6> : <></>}
                                </div>
                                <Field name="passwordRepeat" type="password" className={"inputField"}/>
                            </div>
                            <div>
                                <div className="error-container">
                                    <label>Fullname</label>
                                    {errors.fullname ? <h6>({errors.fullname})</h6> : <></>}
                                </div>
                                <Field name="fullname" type="text" className={"inputField"}/>
                            </div>
                            <div>
                                <div className="error-container">
                                    <label>E-Mail</label>
                                    {errors.email ? <h6>({errors.email})</h6> : <></>}
                                </div>
                                <Field name="email" type="email" className={"inputField"}/>
                            </div>
                            <div>
                                <div className="error-container">
                                    <label>Homecity</label>
                                    {errors.homecity ? <h6>({errors.homecity})</h6> : <></>}
                                </div>
                                <Field name="homecity" type="text" className={"inputField"}/>
                            </div>
                            <button className="signup-btn" type={"submit"}>
                                <SubmitIcon width={30} height={30} color={"white"}/>
                                <p>Submit</p>
                            </button>
                        </Form>
                    )}
                </Formik>
            <div>
                <h4>Already registered?</h4>
                <button className="signup-btn" onClick={goToLoginButtonHandler}>
                    <LoginIcon width={30} height={30} color={"white"}/>
                    <p>Go to login</p>
                </button>
            </div>
        </div>
    );
}

export default Register;