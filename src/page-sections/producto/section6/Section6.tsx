"use client"
import Container from "@component/Container";
import Grid from "@component/grid/Grid";
import { colors } from "theme/colors";
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { Button } from "@component/buttons";
import Login from '@component/sessions/Login';
import UserLoginDialog from "@component/header/LoginDialog";
import { colors as color } from "@utils/themeColors";
import { useAppContext } from "@context/AppContext";
import useForm from "@hook/useForm";
import "./style.css";
import Whatsapp from "@component/whatsapp";
import Image from "next/image";

const Section6 = ({params, url, isAuthenticated, setShared, message, product, images}) => {
   
    const {form, changed} = useForm();
    const { state, dispatch } = useAppContext();
    const cartItem = state.cart.find((item) => item.id === product?.id);
    const [image, setImage] = useState(0);

    useEffect( () => { }, [product, images]);

    

    const quantitys: JSX.Element[] = []
    for (let index = 1; index <= product?.stock_quantity; index++) {
        quantitys.push(<option key={index} value={index}>{index}</option>);
    }

    const LOGIN_HANDLE = (
        <Button ml="1rem" bg="gray.black" p="8px" style={{width:"100%", backgroundColor:color.titan.yellow, color: color.titan.dark, marginLeft: "0", marginBottom: "10px"}}>
          Comprar Ahora
        </Button>
    );

    const changeImage = (indice:number) => {
        setImage(indice)
    }

    const handleCartAmountChange = (qty: number) => {
        let quantity = Object.keys(form).length == 0 ? qty : Number(form["quantity"]);
        let imgUrl:any = product?.images[0].src;
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: { price: product?.price, imgUrl, id:product?.id, qty: quantity, slug:product?.slug, name: product?.name },
        });
    };

    const changedShared = () => {
        setShared("activate")
    }

    return (
        <div className="content-responsive">
            <h4>{product?.name}</h4>

            <div className="content-image">
                <div className="mask">
                    <Image 
                        src={product?.images[image].src}
                        alt={product?.images[image].name}
                        height={500}
                        width={500}
                        layout="responsive"
                        style={{objectFit: "cover"}}
                        loading="lazy"
                    />
                    <button type="button" onClick={changedShared} name="btn-shared" aria-label="compartir producto"><i className="fa-solid fa-share-nodes"></i></button>
                    <ul>
                        {
                            images.map((item:any, indice:any) => (
                                <li key={indice} className={indice == image && "selected"} onClick={() => changeImage(indice)}></li>
                            ))
                        }
                   </ul>
                </div>    
            </div>

            <span className="price">Precio: <strong>$ {product?.price}</strong></span>
            <label className="info-send">{message}</label>

            <select name="quantity1" id="quantity1" defaultValue={form["quantity1"]} onChange={changed} aria-label="cantidad del producto">
                <option disabled selected>-- Seleccione la cantidad de productos --</option>
                {quantitys}
            </select>

            <Button
                size="none"
                padding="10px 0"
                style={{color: color.titan.dark, backgroundColor: color.titan.yellow_light, border: "none", textAlign: "center", width: "100%", fontWeight: "bold", fontFamily: "18px !important", height: "47px", margin: "10px 0"}}
                variant="outlined"
                onClick={() => handleCartAmountChange((cartItem?.qty || 0) + 1)}
            >
                Añadir Al Carrito
            </Button>

            
            
            {!isAuthenticated && <Link href="/comprar-ahora" onClick={() => handleCartAmountChange((cartItem?.qty || 0) + 1)} className="btn-buy-now_section">Comprar Ahora</Link>}
            {isAuthenticated &&  
                <UserLoginDialog handle={LOGIN_HANDLE}>
                <div>
                    <Login redirect="/comprar-ahora"/>
                </div>
                </UserLoginDialog>
            }

            <Whatsapp />

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
    )
}

export default Section6;
