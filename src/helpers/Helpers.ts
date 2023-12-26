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

    static isAuthenticated = (keyUser:any) => {
        let data = Authentication.getItem(keyUser);
        return data === null;
    }

    static routesPrivates = (hash) => {
        let validate = true;
        const routesPrivates = ["perfil", "ordenes", "wishlist", "support ticket", "direcciones", "metodos de pago", "edit", "comprar-ahora"];
        const url = window.location.href;
        const isAuthenticated = Helpers.isAuthenticated(hash);
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

    static infoSend = () => {
        let day_week;
        let time = new Date();
        let hour = time.toTimeString();
        let day = time.getDay();

        switch (day) {
            case 1:
                day_week = "Lunes";
                break;
            case 2:
                day_week = "Martes";
                break;
            case 3:
                day_week = "Miercoles";
                break;
            case 4:
                day_week = "Jueves";
                break;
            case 5:
                day_week = "Viernes";
                break;
            case 6:
                day_week = "Sabado";
                break;
            case 0:
                day_week = "Domingo";
                break;
        }

        let holiday = Helpers.holidays(time.toLocaleDateString());
        let validate_sunday = day_week === "Sabado" && (hour > "12:00:00" && hour < "23:59:59") || day_week === "Domingo" && ((hour > "00:00:00" && hour < "12:00:00") || ( hour > "12:00:00" && hour < "23:59:59"));
        let validate_holiday = holiday && (hour > "00:00:00" || hour > "12:00:00" || hour < "23:59:59");

        let message:string = validate_holiday ? "Tu pedido Llegara el dia siguiente en Bogota!!" 
                            : validate_sunday ? "Tu pedido Llegara el dia Lunes en Bogota!!" 
                            : hour > "12:00:00" && hour < "23:59:59" ? "Tu pedido sera despachado el dia de mañana!!" 
                            : "Tu pedido sera despachado el dia de hoy!!";

        return message;
    }

    static holidays = (date:any) => {
        let holidays = ["16/10/2023", "6/11/2023", "13/11/2023", "8/12/2023", "25/12/2023", "1/01/2024"];
        let festivo = false;
        for (let index = 0; index < holidays.length; index++){
            if(holidays[index] === date){
                festivo = true;
                break;
            }
        }
        return festivo;
    }

}

export default Helpers;