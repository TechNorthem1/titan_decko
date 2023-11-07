import Container from '@component/Container'
import Grid from '@component/grid/Grid';
import React from 'react'
import { color } from 'styled-system';
import { colors } from 'theme/colors';
import "./style.css"


const Section1 = () => {
  return (
    <Container className='container-product' bg={{background:colors.gray.gray}}>
        <Grid container spacing={3} >
            <Grid item lg={2} xs={12}>
                <div className='container_images'>
                    <img src="https://titandecko.com.co/wp-content/uploads/2023/02/TIENDA-VIRTUAL-CATALOGO-DE-RODAPE-Molduras-Adhesivas-3D-Para-Paredes-12-100x100.jpg" alt="" />
                    <img src="https://titandecko.com.co/wp-content/uploads/2023/02/TIENDA-VIRTUAL-CATALOGO-DE-RODAPE-Molduras-Adhesivas-3D-Para-Paredes-13-100x100.jpg" alt="" />
                    <img src="https://titandecko.com.co/wp-content/uploads/2023/02/Moldura_adhesiva_3D_para_paredes_ranuradas_rollo_--100x100.jpg" alt="" />
                </div>
            </Grid>

            <Grid item lg={6} xs={6}>
                <div className='product_image'>
                    <img src="https://titandecko.com.co/wp-content/uploads/2023/02/TIENDA-VIRTUAL-CATALOGO-DE-RODAPE-Molduras-Adhesivas-3D-Para-Paredes-12.jpg" alt="" />
                </div>
            </Grid>
            <Grid item lg={4} xs={6}>
                <div className='information-product' style={{color: colors.gray.black}}>
                    <h1 style={{color:colors.gray.black}}>Molduras Flexibles 3D Para Paredes Ranuradas Rollo 7cm X 5mts – RP7-5</h1>
                    <div className="califications">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>

                    </div>
                    <div className="sends">
                        <p style={{color:colors.blue.blue, textTransform: "uppercase"}}>Envios a nivel Nacional</p>
                        <p style={{color:colors.blue.blue}}>Te llega hasta en 48 Horas</p>
                    </div>
                    <div className="price">
                        <span className='price-before'>$140.000,00</span>
                        <span className='price-after'>$126.500,00</span>
                    </div>
                    <div className="info-send">
                        <span className='send-free'>Envio Gratis</span>
                        <span className='order-text'>Tu Pedido Sera Despachado el dia de hoy</span>
                        <span className=''>Descuento: -10%</span>
                    </div>

                    <div className="payments">
                        <h3>Medios de pago</h3>
                    </div>

                    <div className="count">
                        <span>15 Displonibles</span>
                    </div>

                    <div className="btns-actions">

                        <a href="" className="btn-add-cart">Añadir Al Carrito</a>
                        <a href="" className="btn-whatsapp">Compra este producto por Whatsapp</a>
                        <a href="" className="btn-buy-now">Comprar Ahora</a>
                    </div>
                </div>
            </Grid>
        </Grid>
    </Container>
  )
}

export default Section1;
