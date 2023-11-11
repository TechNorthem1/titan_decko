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

const Sections2 = () => {
    return (
        <Container className='product_relations'>
            <h2 color='black'>Productos Relacionados</h2>

            <Carousel
                showDots
                step={3}
                showArrowOnHover={true}
                arrowButtonColor="inherit"
                totalSlides={2}
                visibleSlides={3}
            >
                <Box py="0.15em" key={1} >
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
                <Box py="0.15rem" key={1} >
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

                <Box py="0.15rem" key={1} >
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
 

export default Sections2;