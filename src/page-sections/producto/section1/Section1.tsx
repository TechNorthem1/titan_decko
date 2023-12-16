"use client"
import Container from "@component/Container"
import Grid from "@component/grid/Grid";
import React, { useEffect, useState } from "react"
import { colors } from "theme/colors";
import Whatsapp from "@component/whatsapp";
import "./style.css"
import Link from "next/link";
import { calculateDiscount } from "@utils/utils";
import Helpers from "@helpers/Helpers";
import api from "@utils/__api__/productos";
import UserLoginDialog from "@component/header/LoginDialog";
import { Button } from "@component/buttons";
import {colors as color} from "@utils/themeColors";
import Login from "@component/sessions/Login";
import { useAppContext } from "@context/AppContext";
import useForm from "@hook/useForm";
import { colors as Colors } from "@utils/themeColors";



const Section1 = ({params, url, isAuthenticated}) => {
    const [product, setProduct] = useState<any>({});
    const {form, changed} = useForm();
    useEffect(()=> {getProduct()}, []);
    useEffect(()=> {}, [product]);
    const { state, dispatch } = useAppContext();
    const cartItem = state.cart.find((item) => item.id === product.id);
    const getProduct = async () => {
        let data = await api.getProduct(`products/${params.id}`);
        setProduct(data)
    }

    const off = Helpers.disscount(product.sale_price, product.regular_price);
    const price = calculateDiscount(product.regular_price, off);
    const images = product.images;
    const quantitys = []
    for (let index = 1; index <= product.stock_quantity; index++) {
        quantitys.push(<option key={index} value={index}>{index}</option>);
    }

    const LOGIN_HANDLE = (
        <Button ml="1rem" bg="gray.black" p="8px" style={{width:"100%", backgroundColor:color.titan.yellow, color: color.titan.dark, marginLeft: "0", marginBottom: "10px"}}>
          Comprar Ahora
        </Button>
    );

    
    const handleCartAmountChange = (qty: number) => {
        let quantity = Object.keys(form).length == 0 ? qty : Number(form["quantity"]);
        let imgUrl:any = product.images[0].src;
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: { price: product.price, imgUrl, id:product.id, qty: quantity, slug:product.slug, name: product.name },
        });
    };


    return (
        <Container className="container-product" style={{background:colors.gray.gray}}>
            <Grid container spacing={3} >
                <Grid className="container_images" item lg={2} xs={0}>
                    <div className="container_images">
                        {images != undefined && images.map((image:any) => (
                            <img key={image.id} src={image.src} alt={image.name} />
                        ))}
                    </div>
                </Grid>

                <Grid item lg={6} xs={12}>
                    <div className="product_image">
                        {images !== undefined && <img key={images[0].id} src={images[0].src} alt={images[0].name} />}
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
                            <select name="quantity" id="quantity" className="quantity" onChange={changed}>
                                <option value="">Seleccione la cantidad...</option>
                                {quantitys}
                            </select>

                            <Button
                                size="none"
                                padding="10px 0"
                                style={{color: Colors.titan.dark, backgroundColor: Colors.titan.yellow_light, border: "none", textAlign: "center", width: "100%", fontWeight: "bold", fontFamily: "18px !important", height: "47px", margin: "10px 0"}}
                                variant="outlined"
                                onClick={() => handleCartAmountChange((cartItem?.qty || 0) + 1)}
                                >
                                Añadir Al Carrito
                            </Button>

                            <Whatsapp title={product.name} price={price} url={url}/>
                            
                            {!isAuthenticated && <Link href={"/comprar-ahora"} className="btn-buy-now">Comprar Ahora</Link>}
                            {isAuthenticated &&  
                                <UserLoginDialog handle={LOGIN_HANDLE}>
                                <div>
                                    <Login redirect="/comprar-ahora"/>
                                </div>
                                </UserLoginDialog>
                            }
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
