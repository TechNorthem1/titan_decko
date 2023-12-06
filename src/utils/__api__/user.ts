import Authentication from "@helpers/Autentication";
class User {

    static getUser = () => {
        let user = Authentication.desencrypt();
        return user;
    }
}

export default User;