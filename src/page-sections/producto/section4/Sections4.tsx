"use client";
import React, {FC} from 'react'
import { Carousel } from '@component/carousel';
import { ProductCard10 } from '@component/product-cards';
import Container from '@component/Container';
import Box from '@component/Box';
import Helpers from '@helpers/Helpers';
import useVisibleSlide from "../../categorias/hooks/useVisibleSlide";
import "./style.css"

type Section4Props = {productsPopular: any[]}

const Section4:FC<Section4Props> = ({productsPopular}) => {
    const { visibleSlides } = useVisibleSlide();
    return (
        <Container className='product_relations'>
            <hr />
            <h2 color='black'>Quienes vieron este producto tambien compraron</h2>

            <Carousel
                showDots
                step={3}
                showArrowOnHover={true}
                arrowButtonColor="inherit"
                totalSlides={productsPopular.length}
                visibleSlides={visibleSlides}
            >
                {productsPopular.map((item:any) =>(
                    <Box py="0.25rem" key={1} >
                        <ProductCard10
                            id={item.id}
                            slug={item.slug}
                            unit={item.stock_quantity}
                            title={item.name}
                            price={item.regular_price}
                            off={Helpers.disscount(item.sale_price, item.regular_price)}
                            rating={5}
                            images={item.images as string[]}
                            imgUrl={item.images[0]}
                            salePrice={item.sale_price}
                        />
                    </Box>
                ))}

            </Carousel>
                
        </Container>
    )
}
 

export default Section4;