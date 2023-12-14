import Authentication from "./Authentication.model";

class Client extends Authentication{
    constructor(
        public name?:string,
        public lastname?:string,
        public document?:string,
        public email?:string,
        public phone?:string,
        public address?:string,
        public password?:string,
        public departament?:string,
        public municipaly?:string,
        public avenue?:string,
        public address1?:string,
        public address2?:string,
        public address3?:string,
        public method?:string,
        public complement_information?:string,
        public infomation_aditional?:string,
        public neighborhood?:string


    ){
        super(email, password);
    }


    toFirestore(){
        return {
            name: this.name,
            lastname: this.lastname,
            document: this.document,
            email: this.email,
            phone: this.phone,
            address: this.address
        }
    }

    toFirestoreAdress(){
        return {
            departament: this.departament,
            municipaly: this.municipaly,
            avenue: this.avenue,
            address1: this.address1,
            address2: this.address2,
            address3: this.address3,
            method: this.method,
            complement_information: this.complement_information,
            infomation_aditional: this.infomation_aditional,
            neighborhood: this.neighborhood
        }
    }
}


export default Client;