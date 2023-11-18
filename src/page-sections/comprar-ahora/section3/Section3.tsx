'use client'

import Container from '@component/Container';
import React from 'react'
import "./style.css"
import { initMercadoPago } from '@mercadopago/sdk-react';
import { Payment } from '@mercadopago/sdk-react';
import { CardPayment } from '@mercadopago/sdk-react';

const Section3 = () => {
  initMercadoPago("");

  return (
    <Container className='data_payments'>
      <h1 className='title'>3. Pago</h1>
      <hr className='line'/>

      <h3 className='title_h3'>selecciona tu metodo de pago</h3>
      <hr className='line_h3'/>
      <div className="content-payments">
        <div className="payment-pse">
          <img src="/assets/images/titan/pse_icon.webp" alt="pse" />
          <span>PSE / Debito</span> 
        </div>
        <div className="payment-cart_credit">
          <img src="/assets/images/titan/credit_cart.webp" alt="tarjeta de credito" />
          <span>Tarjeta de credito</span>
        </div>
        <div className="payment-sisteCredit">
          <img src="/assets/images/titan/sistecredito-mp.webp" alt="sistecredito" />
          <span>SisteCredito</span>
        </div>
        <div className="payment-efecty">
          <img src="/assets/images/titan/efecty.webp" alt="efecty" />
          <span>Efecty</span>
        </div>
      </div>

    </Container>
  )
}


export default Section3;