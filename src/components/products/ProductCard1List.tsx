import { FC } from "react";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Pagination from "@component/pagination";
import { ProductCard1 } from "@component/product-cards";
import { SemiSpan } from "@component/Typography";
import Helpers from "@helpers/Helpers"

import { colors } from "@utils/themeColors";

// ==========================================================
type Props = { products?: [], totalPage?:string|any, page?:number, setPage?:any, getProduct?:any };
// ==========================================================

const ProductCard1List: FC<Props> = ({ products, totalPage, page, setPage, getProduct }) => {
  return (
    <div>
      <Grid container spacing={6}>
        {products.map((item:any) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard1
              id={item.id}
              slug={item.slug}
              price={item.regular_price}
              title={item.name}
              off={Helpers.disscount(item.sale_price, item.regular_price)}
              images={item.images}
              imgUrl={item.images[0]?.src}
              rating={4}
              salePrice={item.sale_price}
            />
          </Grid>
        ))}
      </Grid>
      {parseInt(totalPage)/30 > 1 && (
        <FlexBox
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          mt="32px"
        >
          <SemiSpan color={colors.titan.dark}>Mostrando {page}-{Math.ceil(parseInt(totalPage)/30)} de {products.length} Productos</SemiSpan>
          <Pagination pageCount={Math.ceil(parseInt(totalPage)/30)} pagination={page}  setPage={setPage} getProduct={getProduct}/>
        </FlexBox>
      )}
    </div>
  );
};

export default ProductCard1List;
