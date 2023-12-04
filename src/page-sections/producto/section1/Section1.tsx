import Container from "@component/Container"
import Grid from "@component/grid/Grid";
import React from "react"
import { colors } from "theme/colors";
import Whatsapp from "@component/whatsapp";
import "./style.css"
import Link from "next/link";
import { calculateDiscount } from "@utils/utils";
import Helpers from "@helpers/Helpers";

const Section1 = ({product, url}) => {
    const off = Helpers.disscount(product.sale_price, product.regular_price);
    const price = calculateDiscount(product.regular_price, off);
    const images = product.images;
    const quantitys = []
    for (let index = 1; index <= product.stock_quantity; index++) {
        quantitys.push(<option value={index}>{index}</option>);
    }

    return (
        <Container className="container-product" style={{background:colors.gray.gray}}>
            <Grid container spacing={3} >
                <Grid className="container_images" item lg={2} xs={0}>
                    <div className="container_images">
                        {images.map((image:any) => (
                            <img src={image.src} alt={image.name} />
                        ))}
                        
                        {/* <img src="/assets/images/titan/TIENDA-VIRTUAL-CATALOGO-DE-RODAPE-Molduras-Adhesivas-3D-Para-Paredes-12.webp" alt="" />
                        <img src="/assets/images/titan/TIENDA-VIRTUAL-CATALOGO-DE-RODAPE-Molduras-Adhesivas-3D-Para-Paredes-12.webp" alt="" /> */}
                    </div>
                </Grid>

                <Grid item lg={6} xs={12}>
                    <div className="product_image">
                        <img src={images[0].src} alt={images[0].name} />
                    </div>
                </Grid>
                <Grid item lg={4} xs={12}>
                    <div className="information-product" style={{color: colors.gray.black}}>
                        <h1 style={{color:colors.gray.black}}>{product.name}</h1>
                        <div className="califications">
                            <i className="fa-solid fa-star"></i>
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
                            <span className="price-before">$ {product.regular_price}</span>
                            <span className="price-after">{price}</span>
                        </div>
                        <div className="info-send">
                            <span className="send-free">Envio Gratis</span>
                            <span className="order-text">Tu Pedido Sera Despachado el dia de hoy</span>
                            <span className="">Descuento: -{off}%</span>
                        </div>

                        <div className="payments">
                            <h3>Medios de pago</h3>
                        </div>

                        <div className="count">
                            <span>{product.stock_quantity} Displonibles</span>
                        </div>

                        <div className="btns-actions">
                            <select name="quantity" id="quantity" className="quantity">
                                <option value="">Seleccione la cantidad...</option>
                                {quantitys}
                            </select>
                            <a href="" className="btn-add-cart">Añadir Al Carrito</a>
                            <Whatsapp title={product.name} price={price} url={url}/>
                            <Link href={"/comprar-ahora"} className="btn-buy-now">Comprar Ahora</Link>
                        </div>

                        <div className="pay-security">
                            <div className="pay">
                                <i className="fa-solid fa-credit-card"></i>
                                <div className="card-pay">
                                    <p>Pago Seguro</p>
                                    <p>puedes pagar de forma segura y como quieras</p>
                                </div>
                            </div>

                            <div className="pay">
                                <i className="fa-solid fa-shield-halved"></i>
                                <div className="card-pay">
                                    <p>Compra protegida</p>
                                    <p>si no te gusta devuelvelo</p>
                                </div>
                            </div>

                            <div className="pay">
                                <i className="fa-solid fa-handshake"></i>
                                <div className="card-pay">
                                    <p>Atencion personalizada</p>
                                    <p>habla con nosotros, atendemos tus dudas o preguntas en tiempo real</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <hr />
        </Container>
    )
}

export default Section1;
