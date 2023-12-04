"use client";
import Container from '@component/Container';
import Grid from '@component/grid/Grid';
import React from 'react'
import "./style.css"
import Card from '@component/Card';
import { ProductCard10, ProductCard4 } from '@component/product-cards';
import Link from 'next/link';
import Box from '@component/Box';
import { Carousel } from '@component/carousel';

const Section4 = () => {
    return (
        <Container className='product_relations'>
            <hr />
            <h2 color='black'>Quienes vieron este producto tambien compraron</h2>

            <Carousel
                showDots
                step={1}
                showArrowOnHover={true}
                arrowButtonColor="inherit"
                totalSlides={1}
                visibleSlides={2}
            >
                <Box py="0.25rem" key={1} >
                    <ProductCard10
                        id={1}
                        slug={"panel adesivo"}
                        unit={"5"}
                        title={"panel adesivo"}
                        price={420200}
                        off={6}
                        rating={5}
                        images={["kasdaklsjl"] as string[]}
                        imgUrl={"https://titandecko.com.co/wp-content/uploads/2022/12/tienda-PANELAUTOADHESIVO-EASYWALL-PAREDESADHESIVAS-PANELADHESIVO-TITANDECKO-VIINILODECORATIVO-PANEL3D-PAREDES3D-PANELES3D-ADHESIVO3D-MURALES3D-MUROS3D_3_08bcefec-6a10-4b8b-bf64-4680771f9097-400x400.jpg"}
                    />
                </Box>

                <Box py="0.25rem" key={1} >
                    <ProductCard10
                        id={1}
                        slug={"panel adesivo"}
                        unit={"5"}
                        title={"panel adesivo"}
                        price={420200}
                        off={6}
                        rating={5}
                        images={["kasdaklsjl"] as string[]}
                        imgUrl={"https://titandecko.com.co/wp-content/uploads/2022/12/tienda-PANELAUTOADHESIVO-EASYWALL-PAREDESADHESIVAS-PANELADHESIVO-TITANDECKO-VIINILODECORATIVO-PANEL3D-PAREDES3D-PANELES3D-ADHESIVO3D-MURALES3D-MUROS3D_3_08bcefec-6a10-4b8b-bf64-4680771f9097-400x400.jpg"}
                    />
                </Box>

            </Carousel>
                
        </Container>
    )
}
 

export default Section4;