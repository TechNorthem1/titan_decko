import { FC } from "react";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Pagination from "@component/pagination";
import { ProductCard1 } from "@component/product-cards";
import { SemiSpan } from "@component/Typography";
import Helpers from "@helpers/Helpers"

import { colors } from "@utils/themeColors";

// ==========================================================
type Props = { products?: any[], totalPage?:string };
// ==========================================================

const ProductCard1List: FC<Props> = ({ products, totalPage }) => {
  return (
    <div>
      <Grid container spacing={6}>
        {products.map((item) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard1
              id={item.id}
              slug={item.slug}
              price={item.regular_price}
              title={item.name}
              off={Helpers.disscount(item.sale_price, item.regular_price)}
              images={item.images}
              imgUrl={item.images[0].src}
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
          <SemiSpan color={colors.titan.dark}>Mostrando 1-{Math.ceil(parseInt(totalPage)/30)} de {products.length} Productos</SemiSpan>
          <Pagination pageCount={Math.ceil(parseInt(totalPage)/30)} />
        </FlexBox>
      )}
    </div>
  );
};

export default ProductCard1List;
