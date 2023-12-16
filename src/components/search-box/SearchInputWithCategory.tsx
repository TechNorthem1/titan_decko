"use client"
import { FC, useCallback, useEffect, useState, KeyboardEvent } from "react";
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
import { useRouter } from "next/navigation";
import useForm from "@hook/useForm";

interface SearchInputWithCategoryProps {
  isResposive?: boolean;
}

const SearchInputWithCategory: FC<SearchInputWithCategoryProps> = ({isResposive}) => {
  const [resultList, setResultList] = useState<any[]>([]);
  const {form, changed} = useForm({});
  const [category, setCategory] = useState("Categorias");
  const handleCategoryChange = (cat: string) => () => setCategory(cat);
  const router = useRouter();
  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    let search:any = form["search-field"];
    if (event.key === 'Enter') {
      router.push(`/productos/${search}`);
    }else{
      const products = await Products.productsBySearched(`products?search=${search}&per_page=9`);
      if (!search) setResultList(products);
      else setResultList(products);
    }
  };

  return (
    <Box style={{position: "relative", flex: "1 1 0", maxWidth: "670px"}} mx="auto">
      <StyledSearchBox>

        <Icon className={isResposive? "search-icon" : "search-icon search-icon-responsive"} size="18px" style={{color: "black"}}>
          search
        </Icon>

        <TextField
          fullwidth
          onChange={changed}
          className={isResposive ? "search-field" : "search-field search-field-responsive"}
          placeholder="Buscar en titandecko.com"
          name="search-field"
          onKeyDown={handleKeyDown}
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
