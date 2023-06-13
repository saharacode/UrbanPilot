import axios from "axios";
import {useState} from "react";

export default function UseUser() {
    const [user, setUser] = useState<string>();
    function postLogin(username:string,password:string){
        return axios.post("/user/login",undefined,{auth:{username,password}})
            .then(response => setUser(response.data));
    }

    return {postLogin, user}
}