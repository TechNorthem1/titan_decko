import Client from "@models/Client.model";
import SecureLS from "secure-ls";
import aes256 from "crypto-js/sha256";



class Authentication {
    static KEY:string = "userAuthenticated"
    static ls:SecureLS;

    static init() {
        if (typeof window !== 'undefined' && !Authentication.ls) {
            Authentication.ls = new SecureLS({ encodingType: 'aes', isCompression: false });
        }
    }

    static hashKey (key:string) {
        return aes256(key).toString();
    }


    static setItem = (keyUser:string, dataItem:any) => {
        Authentication.init();
        const key = Authentication.hashKey(keyUser);
        let item = JSON.stringify(dataItem)
        Authentication.ls.set(key, item);
    }

    static getItem = (keyItem?:any) => {
        Authentication.init();
        const key = Authentication.hashKey(keyItem);
        let item = Authentication.ls.get(key);
        console.log(item)
        return item === null || item === "" ? null : JSON.parse(item);
    } 

    static removeItem(){
        Authentication.init();
        // const key = Authentication.hashKey(dataUser);
        Authentication.ls.clear();
    }

    static register = (e:any, values:any):Client => {
        e.preventDefault();
        let client = new Client();
        client.name = values.name;
        client.lastname = values.lastname;
        client.document = "";
        client.email = values.email;
        client.phone = values.phone;
        client.password = values.password;
        client.address = "";
        return client;
    }
}

export default Authentication;