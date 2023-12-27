"use client";
import { FC } from "react";
import FlexBox from "@component/FlexBox";
import NavLink from "@component/nav-link";
import { H2 } from "@component/Typography";
import Container from "@component/Container";
import { Carousel } from "@component/carousel";
import Box from "@component/Box";
import { ProductCard10 } from "@component/product-cards";
import { CarouselWrapper } from "@component/carousel/styles";
import useVisibleSlide from "./hooks/useVisibleSlide";
import Product from "@models/product.model";
import { colors } from "@utils/themeColors";
import Helpers from "@helpers/Helpers";


// ======================================================================
type Section4Props = { products: Product[], title:string };
// ======================================================================

const Section4: FC<Section4Props> = ({ products, title }) => {
  const { visibleSlides } = useVisibleSlide();  
//  cards 
  return (
    <Container pt="4rem">
      <FlexBox alignItems="center" justifyContent="space-between" mb="1.5rem">
        <H2 fontSize={20} style={{color: colors.titan.dark}}>{title}</H2>
        <NavLink href="#" style={{color:colors.titan.dark}}>Ver mas</NavLink>
      </FlexBox>

      <CarouselWrapper color="dark">
        <Carousel totalSlides={products.length} visibleSlides={visibleSlides}>
          {products.map((item:any) => (
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
      </CarouselWrapper>
    </Container>
  );
};

export default Section4;
