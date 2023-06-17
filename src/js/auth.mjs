import jwt_decode from "jwt-decode";
import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";

export async function login(creds, redirect = "/"){
    try{
        const token = await loginRequest(creds);
        setLocalStorage("so_token", token);
        window.location = redirect;
    }
    catch(err){
        alertMessage(err.message.message);
    }
    
}

export function checkLogin(){
    const token = getLocalStorage("so_token");
    const valid = isTokenValid(token);

    if(!valid){
        localStorage.removeItem("so_Token")
        const location = window.location;
        window.location = `/login/index.html?redirect=${location.pathname}`;
    } else return token;
}

export function isTokenValid(token){
    if(token){
        const decoded = jwt_decode(token);
        let date = new Date();
        if(decoded.exp * 1000 < date.getTime()){
            return false;
        } else{
            return true;
        }
    } else {
        return false;
    }
}