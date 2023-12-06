import Box from "@component/Box";
import SearchResult from "@component/search/SearchResult";
import api from "@utils/__api__/productos";

const ProductSearchResult = async({params}) => {
  const {products, totalPage} = await api.getProductsByCategories(`products/?category=${params.id}&per_page=30&order=desc&orderby=price`);
  
  return (
    <Box pt="20px" className="content-box">
      <SearchResult sortOptions={sortOptions} products={products} totalPage={totalPage}/>
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
