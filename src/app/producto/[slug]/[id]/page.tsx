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
  const url = `http://localhost:3000/producto/${params.slug}/${params.id}`;

  useEffect(() => {
    let authenticated = Helpers.isAuthenticated("dataUser");
    let message = Helpers.infoSend();
    setMessage(message);
    setIsAuthenticated(authenticated);
    getProduct();
    getProductsRelated();
  }, [])

  useEffect(() => {
    let responsive = width < 901;
    setResponsive(responsive);
  }, [width, message]); 



  const getProduct = async () => {
    try{
      let response:any = await fetch(`${Method.woocommerce}products/${params.id}`, {method: "GET", headers: {Authorization: Method.token}});
      let product = await response.json()
      setProduct(product)
      setImages(product.images)
      setLoading(false);
    }catch(error){
      error;
    }
  }
  

  const getProductsRelated = async () => {
    try{
      let response:any = await fetch(`${Method.woocommerce}products/${params.id}/related`, {method: "GET", headers: {Authorization: Method.token}});
      let product_related = await response.json();
      setProductRelated(product_related);
    }catch(error){
      error;
    }
  }

 
  return (
    <Fragment>
        <HeaderTitan isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
          <Box>
            
            <Loading classCss={"content-box"} active={loading} setActivate={loading} />

            {!loading && <Section1 
              params={params} 
              url={url} 
              isAuthenticated={isAuthenticated} 
              message={message} 
              product={product}
              images={images}  
            />}


            {!loading && <Section6 
              params={params} 
              url={url} 
              isAuthenticated={isAuthenticated} 
              setShared={setShared} 
              message={message} 
              product={product}
              images={images} 
            />
}
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