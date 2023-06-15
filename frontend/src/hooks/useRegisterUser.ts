import axios from "axios";
import {useState} from "react";
import {User} from "../model/User";

export default function UseRegisterUser() {
    const [userObject, setUserObject] = useState<User>();

    function postRegistration(newUser:User){
        return axios.post("/user/register",newUser)
            .then(response => {
                setUserObject(response.data);
            });
    }

    return {postRegistration}
}