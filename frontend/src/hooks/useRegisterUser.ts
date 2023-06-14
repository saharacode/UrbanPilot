import axios from "axios";
import {useState} from "react";

export default function UseRegisterUser() {
    const [user, setUser] = useState<string>();

    function postRegistration(username:string,password:string,fullname:string,email:string,homecity:string){
        return axios.post("/user/login",undefined,{auth:{username,password}})
            .then(response => {
                setUser(response.data)
            });
    }

    return {postRegistration}
}