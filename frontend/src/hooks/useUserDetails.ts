import axios from "axios";
import {useState} from "react";
import {User} from "../model/User";

export default function UseUserDetails() {
    const emptyUser: User = {
        username: "",
        password: "",
        fullname: "",
        email: "",
        homecity: ""
    };
    const [userDetails, setUserDetails] = useState<User>(emptyUser);

    function getUserDetails(){
        return axios.get(`/user/details`)
            .then(response => {
                setUserDetails(response.data)
            });
    }

    return {getUserDetails, userDetails, setUserDetails, emptyUser}
}