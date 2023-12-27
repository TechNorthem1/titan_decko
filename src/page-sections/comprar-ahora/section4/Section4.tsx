import Container from '@component/Container';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { currency } from '@utils/utils';
import shopping from "/public/assets/images/logos/shopping-bag.svg";
import "./style.css";

const Section4 = ({state}) => {
  const [total, setTotal] = useState(0);
  useEffect(() => getPrice(), []);

  const getPrice = () => {
    let price_total:number = 0;
    state.cart.map((item:any) => {
      price_total += item.price * item.qty;
    })

    setTotal(price_total);
  }

  return (
    <Container className='data_purchase_summary' >
      <h1 className="title">resumen de la compra</h1>

      <div className="content-product">
        <ul>
          {state.cart.length > 0 ? (state.cart.map((item:any) => (
            <li key={item.id}>
              <span className='quantity'>{item.qty}</span>
              <img src={item.imgUrl} className='image_product' alt="image_product" />
              <p className="description">
                <span className='name_product'>{item.name}</span>
                <span className='price_product'>$ {item.price}</span>
              </p>
            </li>
          ))) : (
            <li className='not-found'>
              <img src={shopping.src} alt="shopping" />
              <p style={{color: "black"}}>Tu bolsa de compras está vacía. Empieza a comprar</p>
            </li>
          )}
        </ul>
      </div>

      <div className="detail_buy">
        <p className="subtotal">subtotal</p>
        <p className="price_subtotal">{currency(total)}</p>
        <p className="total">total</p>
        <p className="price_total">{currency(total)}</p>
      </div>
      <Link href="/carrito" className="back">volver al carrito</Link>
    </Container>
  )
}


export default Section4;