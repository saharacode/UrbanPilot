import axios from "axios";
import {useState} from "react";

export default function UseUserLogout() {
    const [logoutConfirmation, setLogoutConfirmation] = useState<string>();
    function postLogout(){
        return axios.post("/user/logout",null, {withCredentials: true})
            .then(response => setLogoutConfirmation(response.data));
    }

    return {postLogout, logoutConfirmation}
}