import Client from "@models/Client.model";
import Crypto from "crypto-js";

class Authentication {
    static KEY:string = "userAuthenticated"

    static encryp = (keyUser:string, authenticatedUser:any) => {
        let keyAuthentication = Authentication.encriptKey(Authentication.KEY);
        let key:string = Authentication.encriptKey(keyUser);
        let param:string =  Crypto.AES.encrypt(authenticatedUser, keyAuthentication).toString();
        return { key, param }
    }

    static desencrypt = (keyUser?:string) => {
        try{
            let keyAuthentication = Authentication.encriptKey(Authentication.KEY);
            let key:string = Authentication.encriptKey(keyUser);
            let user = localStorage.getItem(key) === undefined ? null : localStorage.getItem(key);
            return  user === null ? null : JSON.parse(Crypto.AES.decrypt(user, keyAuthentication).toString(Crypto.enc.Utf8));
        }catch(error){
            console.log(error);
        }
    }

    static encriptKey = (keyUser?:string) => {
        return Crypto.SHA256(keyUser).toString();
    }


    static encriptToken = (keyUser?:string, token?:string) => {
        let keyToken:string = Authentication.encriptKey();;
        let tokenEcrypt:string = Crypto.AES.encrypt(token, Authentication.KEY).toString();
        return {
            keyToken,
            tokenEcrypt
        }
    }

    static register = (e:any, values:any):Client => {
        e.preventDefault();
        let client = new Client();
        client.name = values.name;
        client.lastname = values.lastname;
        client.email = values.email;
        client.phone = values.phone;
        client.password = values.password;
        client.address = "";
        return client;
    }
}

export default Authentication;