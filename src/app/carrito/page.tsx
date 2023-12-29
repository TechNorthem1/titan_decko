"use client";
import { Fragment, useEffect, useState } from "react";
import { useAppContext } from "@context/AppContext";
import { ProductCard7 } from "@component/product-cards";
import Grid from "@component/grid/Grid";
import Section1 from "@sections/carrito/section";
import Helpers from "@helpers/Helpers";
import shopping from "/public/assets/images/logos/shopping-bag.svg";
import Authentication from "@helpers/Autentication";
import { stat } from "fs";


const Cart = () => {
  const { state } = useAppContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let Authenticated = Helpers.isAuthenticated("dataUser");
    setIsAuthenticated(Authenticated);
    getCart();
    getPrice();
  }, []);

  const getCart = () => {
    let cart = JSON.parse(Authentication.getItem("cart")) == null ? [] : JSON.parse(Authentication.getItem("cart"));
    state.cart = cart;
  }

  const getPrice = () => {
    
    let total:number = 0;
    state.cart.map((item:any) => total += item.price * item.qty);
    setTotal(total);
  }

  const sendLocalStorage = () => {
    let cart = JSON.stringify(state.cart);
    Authentication.setItem("cart", cart);
  }


  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item lg={8} md={8} xs={12}>
          {state.cart.length > 0 ? (state.cart.map((item) => (
            <ProductCard7
              mb="1.5rem"
              id={item.id}
              key={item.id}
              qty={item.qty}
              slug={item.slug as string}
              name={item.name}
              price={item.price}
              imgUrl={item.imgUrl}
            />
          ))): (
            <div className="shop-notFound" style={{display: "flex", alignItems: "center", flexDirection:"column", justifyContent: "center", height: "394px", padding: "12px"}}>
              <img src={shopping.src} alt="shopping" />
              <p style={{color: "black"}}>Tu bolsa de compras está vacía. Empieza a comprar</p>
            </div>
          )}
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <Section1 isAuthenticated={isAuthenticated} total={total} sendLocalStorage={sendLocalStorage}/>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const stateList = [
  { value: "New York", label: "New York" },
  { value: "Chicago", label: "Chicago" },
];

export default Cart;
