import Authentication from "./Autentication";

class Helpers {

    static disscount = (sale_price:number, regular_price:number):number => {
        let price = String(sale_price) == "" ? regular_price : sale_price;
        let disscount = (price/regular_price-1) * 100;
        disscount = Math.ceil(disscount);
        disscount = Math.abs(disscount);
        return disscount;
    }

    static totalDisscount = (sale_price:number, regular_price:number):number => {
        let price = String(sale_price) == "" ? regular_price : sale_price;
        let disscount = (price/regular_price-1) * 100;
        disscount = Math.ceil(disscount);
        disscount = Math.abs(disscount);
        let off = disscount / 100;
        let total = regular_price - regular_price * off; 
        return  total;
    }

    static isAuthenticated = (keyUser:string) => {
        let data = Authentication.desencrypt(keyUser);
        return data === null;
    }

    static routesPrivates = () => {
        let validate = true;
        const routesPrivates = ["perfil", "ordenes", "wishlist", "support ticket", "direcciones", "metodos de pago", "edit", "comprar-ahora"];
        const url = window.location.href;
        const isAuthenticated = Helpers.isAuthenticated("dataUser");
        for (let i = 0; i < routesPrivates.length; i++) {
           
            if(url.includes(routesPrivates[i]) && isAuthenticated){
                validate = true;
                break;
            }else{
                validate = false;
            }
        }
        return validate;
    }

}

export default Helpers;