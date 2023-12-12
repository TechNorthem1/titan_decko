import Authentication from "./Authentication.model";

class Client extends Authentication{
    constructor(
        public name?:string,
        public lastname?:string,
        public email?:string,
        public phone?:string,
        public address?:string,
        public password?:string
    ){
        super(email, password);
    }


    toFirestore(){
        return {
            name: this.name,
            lastname: this.lastname,
            email: this.email,
            phone: this.phone,
            address: this.address
        }
    }
}


export default Client;