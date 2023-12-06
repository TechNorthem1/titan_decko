import Crypto from "crypto-js";

class Authentication {
    static KEY:string = "userAuthenticated"

    static encryp = (authenticatedUser:any) => {
        
        let key:string = Authentication.encriptKey();
        let param:string =  Crypto.AES.encrypt(authenticatedUser, key).toString();
        return { key, param }
    }

    static desencrypt = () => {
        let key:string = Authentication.encriptKey();
        let user = localStorage.getItem(key) === undefined ? null : localStorage.getItem(key);
        return  user === null ? null : JSON.parse(Crypto.AES.decrypt(user, key).toString(Crypto.enc.Utf8));
    }

    static encriptKey = () => {
        return Crypto.SHA256(Authentication.KEY).toString();
    }
}

export default Authentication;

