'use client'
import Box from "@component/Box";
import SearchResult from "@component/search/SearchResult";
import { useEffect, useState } from "react";
import Method from "@helpers/Method";
import Loading from "@component/loading/Loading";

const ProductSearchResult = ({params}:any) => {
  useEffect(() => { getProduct() }, []);
  const [products, setProducts ]:any[] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  let search:string = isNaN(params.id) ? `products/?search=${params.id}&page=${page}&per_page=30&order=desc&orderby=price&stock_status=instock` : `products/?category=${params.id}&page=${page}&per_page=30&order=desc&orderby=price&stock_status=instock`; 

  const getProduct = async () =>{
    try{
      let response = await fetch(`${Method.woocommerce}${search}`, {method: "GET", headers: {Authorization: `${Method.token}`}});
      let products:[] = await response.json();
      let totalPage = response.headers.get("X-WP-Total");
      setProducts(products);
      setTotalPage(Number(totalPage));
      setLoading(false);
    }catch(error){
      error;
    }
  } 

  
  return (
    <Box pt="20px">
      {loading ? (
        <Loading active={loading} setActivate={setLoading} classCss={""}/>
      ):(
        <SearchResult 
          sortOptions={sortOptions} 
          products={products} 
          totalPage={totalPage} 
          page={page} 
          setPage={setPage}
          getProduct={getProduct}
        />
      )}
    </Box>
  );  
};

const sortOptions = [
  { label: "Relevancia", value: "Relevance" },
  { label: "Fecha", value: "Date" },
  { label: "Precio de menor a mayor", value: "Price Low to High" },
  { label: "Precio de mayor q menor", value: "Price High to Low" },
];




export default ProductSearchResult;
