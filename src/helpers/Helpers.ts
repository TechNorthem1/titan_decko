class Helpers {

    static disscount = (sale_price:number, regular_price:number):number => {
        let disscount = (sale_price/regular_price-1) * 100;
        disscount = Math.ceil(disscount);
        disscount = Math.abs(disscount);
        return disscount;
    }

    static totalDisscount = (sale_price:number, regular_price:number):number => {
        let disscount = (sale_price/regular_price-1) * 100;
        disscount = Math.ceil(disscount);
        disscount = Math.abs(disscount);
        let off = disscount / 100;
        let total = regular_price - regular_price * off; 
        return  total;
    }
}

export default Helpers;