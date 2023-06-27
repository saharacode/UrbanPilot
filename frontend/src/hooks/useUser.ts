import axios from "axios";
import {useState} from "react";

export default function UseUser() {
    const [user, setUser] = useState<string>();
    const [userExists, setUserExists] = useState(true);
    const [errorMessage, setErrormessage] = useState("unknown error")
    function postLogin(username:string,password:string){
        return axios.post("/user/login",undefined,{auth:{username,password}})
            .then(response => {
                setUser(response.data)
                setUserExists(true);
            })
            .catch((error) => {
                if(error.response && error.response.status === 401){
                    setUser(undefined);
                    setErrormessage("User '" + username + "' does not exist or the password is wrong.")
                    console.error(errorMessage);
                } else {
                    console.error(error);
                }
                setUserExists(false);
            });
    }

    return {postLogin, user, setUser, userExists, setUserExists, errorMessage}
}