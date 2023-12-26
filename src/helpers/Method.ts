class Method {
    public static woocommerce:string = "https://titandecko.com.co/wp-json/wc/v3/"
    public static wordpress:string = "https://titandecko.com.co/wp-json/wp/v2/";
    public static token:string = "Basic Y2tfZmM3NDU4YmUyY2YzYmYyMWQ3ZDdkY2EwZjk0MWZlMTIxMTNhYTRmYzpjc18wYmNmYzAzNTEyMDNmZWI5ZTg4YTMzOTUyMThhMzRkNzU5Zjk5ZGYw";

    static async all(url:string):Promise<Response> {
        let petition = await fetch(`${Method.woocommerce}${url}`, {
            method: "GET",
            headers: {
                Authorization: Method.token,
            }
        })
        return petition;
    }

    static async getOne(url:string):Promise<any[]>{ 
        let petition = await fetch(`${Method.woocommerce}${url}`, {
            method: "GET",
            headers: {
                'Authorization': Method.token
            }
        });

        return await petition.json();
    }

    static async allPosts(url:string){
        try{
            // let response = await fetch(`${Method.wordpress}${url}`);
            let pettition = await fetch(`${Method.wordpress}${url}`, {
                method: "GET"
            });

            let response = await pettition.json();
            return response;
        }catch(error){
            error;
        }
    }
}

export default Method;