import Method from "@helpers/Method";

class Categories{

    static getCategories = async (url:string): Promise<any[]> => {
        const response = await Method.all(url);
        return await response.json();
    }

    static getCategoriesSpecific = async (url:string): Promise<any[]> =>{
        const response = await Method.all(url);
        return await response.json()
    }

}


export default Categories;