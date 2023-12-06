import { FC, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { debounce } from "lodash";
import Box from "../Box";
import Card from "../Card";
import Icon from "../icon/Icon";
import MenuItem from "../MenuItem";
import { Span } from "../Typography";
import TextField from "../text-field";
import StyledSearchBox from "./styled";
import Products from "@utils/__api__/productos"


const SearchInputWithCategory: FC = () => {
  const [resultList, setResultList] = useState<any[]>([]);
  const [category, setCategory] = useState("Categorias");
  const handleCategoryChange = (cat: string) => () => setCategory(cat);
  const search = debounce(async (e) => {
    const value = e.target?.value;
    const products = await Products.productsBySearched(`products?search=${value}&per_page=9`);
    if (!value) setResultList(products);
    else setResultList(products);
  }, 200);

  const hanldeSearch = useCallback((event: any) => {
    event.persist();
    search(event);
  }, []);

  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  return (
    <Box style={{position: "relative", flex: "1 1 0", maxWidth: "670px"}} mx="auto">
      <StyledSearchBox>
        <Icon className="search-icon" size="18px" style={{color: "black"}}>
          search
        </Icon>

        <TextField
          fullwidth
          onChange={hanldeSearch}
          className="search-field"
          placeholder="Buscar en titandecko.com"
        />
      </StyledSearchBox>

      {!!resultList.length && (
        <Card
          position="absolute"
          top="100%"
          py="0.5rem"
          width="100%"
          boxShadow="large"
          zIndex={99}
        >
          {resultList.map((item) => (
            <Link href={`/producto/${item.name}/${item.id}`} key={item.id}>
              <MenuItem key={item.id}>
                <Span fontSize="14px">{item.name}</Span>
              </MenuItem>
            </Link>
          ))}
        </Card>
      )}
    </Box>
  );
};

export default SearchInputWithCategory;
