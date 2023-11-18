import Container from '@component/Container';
import React from 'react';
import "./style.css";

const Section4 = () => {
  return (
    <Container className='data_purchase_summary' >
      <h1 className="title">resumen de la compra</h1>

      <div className="content-product">
        <ul>
          <li>
            <span className='quantity'>1</span>
            <img src="/assets/images/titan/Molduras.webp" className='image_product' alt="image_product" />
            <p className="description">
              <span className='name_product'>Molduras Flexibles 3D Para Techo Rollo 5cm X 10mts – RPT5-10</span>
              <span className='price_product'>$243.500</span>
            </p>
          </li>

          <li>
            <span className='quantity'>1</span>
            <img src="/assets/images/titan/Molduras.webp" className='image_product' alt="image_product" />
            <p className="description">
              <span className='name_product'>Molduras Flexibles 3D Para Techo Rollo 5cm X 10mts – RPT5-10</span>
              <span className='price_product'>$243.500</span>
            </p>
          </li>

          <li>
            <span className='quantity'>1</span>
            <img src="/assets/images/titan/Molduras.webp" className='image_product' alt="image_product" />
            <p className="description">
              <span className='name_product'>Molduras Flexibles 3D Para Techo Rollo 5cm X 10mts – RPT5-10</span>
              <span className='price_product'>$243.500</span>
            </p>
          </li>
        </ul>
      </div>

      <div className="detail_buy">
        <a href="" className="back">volver al carrito</a>
        <p className="subtotal">subtotal</p>
        <p className="price_subtotal">$ 399.000</p>
        <p className="total">total</p>
        <p className="price_total">$ 399.900</p>
      </div>
    </Container>
  )
}


export default Section4;