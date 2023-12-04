import React from 'react'
import "./style.css"
import Link from 'next/link';

const Section1 = () => {
  return (
    <div className='content-info-cart'>
        <div className="info-header">
            <h1>Resumen de compra</h1>
        </div>

        <div className="info-desc" id='info-desc'>
            <div className="code-desc">
                <span>Ingresa aqui tu codigo de descuento</span>
            </div>
        </div>
        
        {/*<div className="info-payment">

        </div> */}

        <div className="info-value-buy">
            <p>Subtotal</p>
            <p>$ 249.000</p>
            <p>Total</p>
            <p>$ 249.000</p>
        </div>

        <div className="btn-actions">
            <Link href="/comprar-ahora">finalizar comprar</Link>
        </div>

    </div>
  )
}


export default Section1;