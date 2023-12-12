import Authentication from "@helpers/Autentication";
class User {

    static getUser = (keyUser:string) => {
        let user = Authentication.desencrypt(keyUser);
        return user;
    }
}

export default User;