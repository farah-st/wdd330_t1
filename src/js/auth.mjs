import jwt_decode from "jwt-decode";
import loginRequest from "./externalServices.mjs";
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

}

export function isTokenValid(){

}