"use client";
import React, { FC } from 'react'
import { Carousel } from '@component/carousel';
import { ProductCard10 } from '@component/product-cards';
import Container from '@component/Container';
import Box from '@component/Box';
import useVisibleSlide from "../../categorias/hooks/useVisibleSlide";
import Helpers from '@helpers/Helpers';
import "./style.css"

// =====================================
interface Section2Props {producstRelated?:any[]}
// =====================================

const Sections2:FC<Section2Props> = ({producstRelated}) => {
    const { visibleSlides } = useVisibleSlide();
    return (
        <Container className='product_relations'>
            <h2 color='black'>Productos Relacionados</h2>

            <Box my="-0.25rem">
                <Carousel
                    showDots
                    step={3}
                    showArrowOnHover={true}
                    arrowButtonColor="inherit"
                    totalSlides={producstRelated.length}
                    visibleSlides={visibleSlides}
                >
                    {producstRelated.map((item:any) =>(
                        <Box py="0.25rem" >

                            <ProductCard10
                                id={item.id}
                                slug={item.slug}
                                unit={"5"}
                                title={item.name}
                                price={item.regular_price}
                                off={Helpers.disscount(item.sale_price, item.regular_price)}
                                rating={5}
                                images={item.images as string[]}
                                imgUrl={item?.images[0]}
                                salePrice={item.sale_price}
                            />
                        </Box>
                    ))}
                </Carousel>
            </Box>
                
        </Container>
    )
}
 

export default Sections2;