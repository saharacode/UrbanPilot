import axios from "axios";

export default function UseUser() {

    function postLogin(username:string,password:string){
        axios.post("/user/login",undefined,{auth:{username,password}})
            .then(response => console.log(response.data));
    }

    return {postLogin}
}