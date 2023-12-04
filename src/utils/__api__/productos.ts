import Method from "@helpers/Method";

class Productos {

    static getProductsByCategories = async (url:string):Promise<any> => {
        const response =  await Method.all(url);
        return {products:await response.json(), totalPage: response.headers.get("X-WP-Total")};
    }

    static getProduct = async (url:string): Promise <any[]> => {
        const response = await Method.getOne(url);
        return response;
    }

}


export default Productos;