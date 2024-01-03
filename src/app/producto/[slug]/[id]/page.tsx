'use client'
import Box from "@component/Box";
import { Footer1 } from "@component/footer";
import { HeaderTitan } from "@component/header_titan";
import React, { Fragment, useEffect, useState } from "react"
import Section1 from "@sections/producto/section1/Section1";
import Section2 from "@sections/producto/section2/Sections2";
import Section3 from "@sections/producto/section3/Sections3";
import Section4 from "@sections/producto/section4/Sections4";
import Section5 from "@sections/producto/section5/Sections5";
import Section6 from "@sections/producto/section6/index";
import Section7 from "@sections/producto/section7/index";
import Helpers from "@helpers/Helpers";
import useResponsive from "@hook/useResposive";
import api from "@utils/__api__/productos";
import MobileNavigationBar from "@component/mobile-navigation";
import Method from "@helpers/Method";
import { colors } from "@utils/themeColors";
import { method } from "lodash";
import Loading from "@component/loading/Loading";
import { useAppContext } from "@context/AppContext";
import Authentication from "@helpers/Autentication";
import Container from "@component/Container";



const Producto = ({params}:any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {width, height }:any = useResponsive();
  const [isResponsive, setResponsive] = useState(false);
  const [shared, setShared] = useState("");
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState<any>();
  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [productRelated, setProductRelated] = useState([]);
  const {state, dispatch} = useAppContext();
  const url = window.location.href;

  useEffect(() => {
    let authenticated = Helpers.isAuthenticated("dataUser");
    let message = Helpers.infoSend();
    setMessage(message);
    setIsAuthenticated(authenticated);
    getProduct();
  }, [])

  useEffect(() => {
    let responsive = width < 901;
    setResponsive(responsive);
  }, [width, message]); 



  const getProduct = async () => {
    try{
      let [productRes, productRelatedRes] = await Promise.all([
        await fetch(`${Method.woocommerce}products/${params.id}`, {method: "GET", headers: {Authorization: Method.token}}),
        await fetch(`${Method.woocommerce}products/${params.id}/related`, {method: "GET", headers: {Authorization: Method.token}})
      ]);

      let product = await productRes.json();
      let product_related = await productRelatedRes.json();
      setProduct(product);
      setImages(product.images);
      setProductRelated(product_related);
      setLoading(false);
    }catch(error){
      error;
    }
  }
  
  const sendLocalStorage = () => {
    let cart = state.cart;
    Authentication.setItem("cart", cart)
  }
 
  return (
    <Fragment>
        <HeaderTitan isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
          <Box>
            
            {loading && 
              <Container>
                <Loading classCss={"content-box"} active={loading} setActivate={loading} />
              </Container>
            }

            {!loading && <Section1 
              params={params} 
              url={url} 
              isAuthenticated={isAuthenticated} 
              message={message} 
              product={product}
              images={images}
              sendLocalStorage={sendLocalStorage}
            />}


            {!loading && <Section6 
              params={params} 
              url={url} 
              isAuthenticated={isAuthenticated} 
              setShared={setShared} 
              message={message} 
              product={product}
              images={images}
              sendLocalStorage={sendLocalStorage}
            />}
            
            {!loading && <Section2 producstRelated={productRelated}/>}
            <Section3 />
            <Section4 />
            <Section5 activate={loading} setActivate={setLoading}/>
            <Section7 shared={shared} setShared={setShared}/>
          </Box>
        <MobileNavigationBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Footer1 />
    </Fragment>
  )
}

export default Producto;