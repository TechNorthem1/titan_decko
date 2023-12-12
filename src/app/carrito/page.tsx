"use client";
import { Fragment, useEffect, useState } from "react";
import { Button } from "@component/buttons";
import { Card1 } from "@component/Card1";
import { currency } from "@utils/utils";
import { useAppContext } from "@context/AppContext";
import { ProductCard7 } from "@component/product-cards";
import Link from "next/link";

import Select from "@component/Select";
import Grid from "@component/grid/Grid";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TextArea from "@component/textarea";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import countryList from "@data/countryList";
import Section1 from "@sections/carrito/section";
import Helpers from "@helpers/Helpers";


const Cart = () => {
  const { state } = useAppContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let Authenticated = Helpers.isAuthenticated("dataUser");
    setIsAuthenticated(Authenticated);
  }, [])
  const getTotalPrice = () => {
    return (
      state.cart.reduce(
        (accumulator, item) => accumulator + item.price * item.qty,
        0
      ) || 0
    );
  };

  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item lg={8} md={8} xs={12}>
          {state.cart.map((item) => (
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
          ))}
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <Section1 isAuthenticated={isAuthenticated}/>
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
