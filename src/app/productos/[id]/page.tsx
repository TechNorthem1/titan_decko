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
  { label: "Relevance", value: "Relevance" },
  { label: "Date", value: "Date" },
  { label: "Price Low to High", value: "Price Low to High" },
  { label: "Price High to Low", value: "Price High to Low" },
];




export default ProductSearchResult;
