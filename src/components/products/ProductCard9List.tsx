import { FC, Fragment } from "react";
import FlexBox from "@component/FlexBox";
import Pagination from "@component/pagination";
import { SemiSpan } from "@component/Typography";
import { ProductCard9 } from "@component/product-cards";
import Helpers from "@helpers/Helpers";
import { colors } from "@utils/themeColors";


// ==========================================================
type Props = { products: any[], totalPage:string };
// ==========================================================

const ProductCard9List: FC<Props> = ({ products, totalPage }) => {

  return (
    <Fragment>
      {products.map((item) => (
        <ProductCard9
          mb="1.25rem"
          key={item.id}
          id={item.id}
          off={Helpers.disscount(item.sale_price, item.regular_price)}
          slug={item.slug}
          title={item.name}
          price={item.regular_price}
          salePrice={4000}
          imgUrl={item.images[0].src}
          images={item.images}
          rating={item.rating}
          categories={item.categories}
        />
      ))}
      {parseInt(totalPage)/30 > 1 && (
        <FlexBox
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          mt="32px"
        >
          <SemiSpan color={colors.titan.dark}>Mostrando 1-{Math.ceil(parseInt(totalPage)/30)} de {products.length} Productos</SemiSpan>
          <Pagination pageCount={parseInt(totalPage)/30} />
        </FlexBox>
      )}
    </Fragment>
  );
};

export default ProductCard9List;
