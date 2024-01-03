"use client"
import React, { Fragment, useEffect, useState } from "react"
import { useAppContext } from "@context/AppContext";
import { Footer1 } from "@component/footer";
import { HeaderTitan } from "@component/header_titan";
import Box from "@component/Box";
import Section1 from "@sections/producto/section1/Section1";
import Section2 from "@sections/producto/section2/Sections2";
import Section3 from "@sections/producto/section3/Sections3";
import Section4 from "@sections/producto/section4/Sections4";
import Section5 from "@sections/producto/section5/Sections5";
import Section6 from "@sections/producto/section6/index";
import Section7 from "@sections/producto/section7/index";
import Helpers from "@helpers/Helpers";
import useResponsive from "@hook/useResposive";
import MobileNavigationBar from "@component/mobile-navigation";
import Method from "@helpers/Method";
import Loading from "@component/loading/Loading";
import Authentication from "@helpers/Autentication";



const Producto = ({params}:any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isResponsive, setResponsive] = useState(false);
  const [shared, setShared] = useState("");
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState<any>();
  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [productRelated, setProductRelated] = useState<any[]>([]);
  const [popularProducts, setPopularProducts] = useState<any[]>([]);
  const [posts, setPosts] = useState([]);
  const {width, height }:any = useResponsive();
  const {state, dispatch} = useAppContext();
  const url = window.location.href;

  useEffect(() => {
    getProduct();
    let authenticated = Helpers.isAuthenticated("dataUser");
    let message = Helpers.infoSend();
    setMessage(message);
    setIsAuthenticated(authenticated);
  }, [])

  useEffect(() => {
    let responsive = width < 901;
    setResponsive(responsive);
  }, [width, message]); 


  const getProduct = async () => {
    try{
      let [productRes, productRelatedRes, popularProductsRes, postsRes] = await Promise.all([
        await fetch(`${Method.woocommerce}products/${params.id}`, {method: "GET", headers: {"Authorization": Method.token}}),
        await fetch(`${Method.woocommerce}products/${params.id}/related`, {method: "GET", headers: {"Authorization": Method.token}}),
        await fetch(`${Method.woocommerce}popular_products`, {method: "GET", headers: {"Authorization": Method.token}}),
        await fetch(`${Method.wordpress}posts/?per_page=8`, {method: "GET"}),
      ]);

      let product = await productRes.json();
      let product_related:any[] = await productRelatedRes.json();
      let popular_products:any[] = await popularProductsRes.json();
      let posts = await postsRes.json();

      setProduct(product);
      setImages(product.images);
      setProductRelated(product_related);
      setPopularProducts(popular_products);
      setPosts(posts);
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
              
            <Loading classCss={"content-box"} active={loading} setActivate={loading} />

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
            <Section4 productsPopular={popularProducts}/>
            <Section5 posts={posts} activate={loading} setActivate={setLoading}/>
            <Section7 shared={shared} setShared={setShared}/>
          </Box>
        <MobileNavigationBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Footer1 />
    </Fragment>
  )
}

export default Producto;