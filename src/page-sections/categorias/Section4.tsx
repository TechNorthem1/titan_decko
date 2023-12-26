"use client";
import { FC } from "react";
import Box from "@component/Box";
import { H3 } from "@component/Typography";
import { Carousel } from "@component/carousel";
import { ProductCard10 } from "@component/product-cards";
import useVisibleSlide from "./hooks/useVisibleSlide";
import { colors } from "@utils/themeColors";
import Link from "next/link";
import Helpers from "@helpers/Helpers";

// =======================================================
type Props = { title: string; products?: any | [], params?: any };
// =======================================================

const Section4: FC<Props> = ({ title, products = [], params} ) => {
  const { visibleSlides } = useVisibleSlide();
  
  return (
    <Box>
      <div className="title-product">
        <H3 fontSize="25px" mb="0" color={colors.titan.dark}>
          {title}
        </H3>

        <Link href={`/productos/${params.id}`}>ver mas productos</Link>
      </div>

      <Box my="-0.25rem">
        <Carousel
          showDots
          step={3}
          showArrowOnHover={true}
          arrowButtonColor="inherit"
          totalSlides={products.length}
          visibleSlides={visibleSlides}
        >
          { products.map((item:any) => (
            <Box py="0.25rem" key={item.id}>
              <ProductCard10
                id={item.id}
                slug={item.slug}
                unit={item.stock_quantity}
                title={item.name}
                price={parseInt(item.regular_price)}
                off={Helpers.disscount(item.sale_price, item.regular_price)}
                rating={item.rating}
                images={item.images as string[]}
                imgUrl={item.images[0].src}
                salePrice={item.sale_price}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default Section4;
