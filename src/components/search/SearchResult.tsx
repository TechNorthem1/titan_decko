"use client";
import Box from "@component/Box";
import Select from "@component/Select";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import { useCallback, useState } from "react";
import useWindowSize from "@hook/useWindowSize";
import { IconButton } from "@component/buttons";
import Sidenav from "@component/sidenav/Sidenav";
import { H5, Paragraph } from "@component/Typography";
import ProductFilterCard2 from "@component/products/ProductFilterCard2";
import ProductCard1List from "@component/products/ProductCard1List";
import ProductCard9List from "@component/products/ProductCard9List";
import Card from "@component/Card";

type Props = {
  sortOptions: {
    label: string;
    value: string;
  }[],
  products?:[],
  totalPage?:number,
  page?:number,
  setPage?:any,
  getProduct?:any
};
const SearchResult = ({ sortOptions, products, totalPage, page, setPage, getProduct }: Props) => {
  const width: any = useWindowSize();
  const [view, setView] = useState<"grid" | "list">("grid");
  const isTablet = width < 1025;
  const toggleView = useCallback((v: any) => () => setView(v), []);


  return (
    <>
      <FlexBox
        as={Card}
        mb="55px"
        p="1.25rem"
        elevation={5}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <div>
          <H5>Resultados para “ mobile phone ”</H5>
          <Paragraph color="text.muted">{products?.length} Productos encontrados</Paragraph>
        </div>

        <FlexBox alignItems="center" flexWrap="wrap">
          <Paragraph color="text.muted" mr="1rem">
            Ordenar por:
          </Paragraph>

          <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
            <Select
              placeholder="Short by"
              defaultValue={sortOptions[0]}
              options={sortOptions}
              aria-label="ordenar los productos"
            />
          </Box>

          <Paragraph color="text.muted" mr="0.5rem">
            Ver :
          </Paragraph>

          <IconButton onClick={toggleView("grid")}>
            <Icon
              variant="small"
              defaultcolor="auto"
              color={view === "grid" ? "primary" : "inherit"}
              aria-label="mostrar los productos por tarjetas"
            >
              grid
            </Icon>
          </IconButton>

          <IconButton onClick={toggleView("list")}>
            <Icon
              variant="small"
              defaultcolor="auto"
              color={view === "list" ? "primary" : "inherit"}
              aria-label="mostrar los productos por lista"
            >
              menu
            </Icon>
          </IconButton>

          {isTablet && (
            <Sidenav
              position="left"
              scroll={true}
              handle={
                <IconButton>
                  <Icon>Optiones</Icon>
                </IconButton>
              }
            >
              <ProductFilterCard2 getProduct={getProduct}/>
            </Sidenav>
          )}
        </FlexBox>
      </FlexBox>

      <Grid container spacing={6}>
        <Hidden as={Grid} item lg={3} xs={12} down={1024}>
          <ProductFilterCard2 getProduct={getProduct}/>
        </Hidden>

        <Grid item lg={9} xs={12}>
          {view === "grid" ? (
            <ProductCard1List products={products} totalPage={totalPage} page={page} setPage={setPage} getProduct={getProduct}/>
          ) : (
            <ProductCard9List products={products} totalPage={totalPage} page={page} setPage={setPage} getProduct={getProduct}/>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default SearchResult;
