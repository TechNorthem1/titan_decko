class Method {
    protected static global:string = "https://titandecko.com.co/wp-json/wc/v3/"
    protected static token:string = "Basic Y2tfZmM3NDU4YmUyY2YzYmYyMWQ3ZDdkY2EwZjk0MWZlMTIxMTNhYTRmYzpjc18wYmNmYzAzNTEyMDNmZWI5ZTg4YTMzOTUyMThhMzRkNzU5Zjk5ZGYw";
    constructor(){}

    static async all(url:string):Promise<Response> {
        let petition = await fetch(`${Method.global}${url}`, {
            method: "GET",
            headers: {
                Authorization: Method.token,
            }
        })
        return petition;
    }

    static async getOne(url:string):Promise<any>{ 
        let petition = await fetch(`${Method.global}${url}`, {
            method: "GET",
            headers: {
                Authorization: Method.token
            }
        }) 

        return await petition.json();
    }
}

export default Method;