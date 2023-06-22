import axios from "axios";
import {useState} from "react";
import {User} from "../model/User";

export default function UseUserDetails() {
    const [userDetails, setUserDetails] = useState<User>();

    function getUserDetails(username:string){
        return axios.get(`/user/details/${username}`)
            .then(response => {
                setUserDetails(response.data)
            });
    }

    return {getUserDetails, userDetails}
}