"use client";
import { Fragment, useEffect, useState } from "react";
import Box from "@component/Box";
import {mainCarouselData as carrousel} from "@server/__db__/market-2/data"
import Section1 from "@sections/market-2/Section1";
import { HeaderTitan } from "@component/header_titan";
import { Footer1 } from "@component/footer";
import Section2 from "@sections/market-2/Section2";
import Section3 from "@sections/categorias/Section3";
import Section4 from "@sections/market-2/Section4";
import Section5 from "@sections/market-2/Section5";
import Section6 from "@sections/market-2/Section6";
import Section7 from "@sections/market-2/Section7";
import Section8 from "@sections/market-2/Section8";
import Section9 from "@sections/market-2/Section9";
import Section10 from "@sections/market-2/Section10";
import MobileNavigationBar from "@component/mobile-navigation";
import Helpers from "@helpers/Helpers";
import { method } from "lodash";
import Method from "@helpers/Method";
import Container from "@component/Container";

const Home = () => {
  const [mainCarouselData, setMainCarouselData] = useState<any>([]);
  const [isAuthenticated, setIsAuthenticated]:any = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {getData(); getDataInfo();}, []);
  // useEffect(() => {getData(); getDataInfo();}, [isAuthenticated, categories, products]);

  const getData = () => {
    let authenticated = Helpers.isAuthenticated("dataUser");
    setIsAuthenticated(authenticated);
    setMainCarouselData(carrousel);
  }

  const getDataInfo = async () => {
    const [categoriesRes, productsRes] = await Promise.all([
      await fetch(`${Method.woocommerce}products/categories/?include=72,163,87,128,173,97,121,78,131,127&per_page=11&orderby=id&order=desc`, {method: "get", headers: {Authorization: Method.token}}),
      await fetch(`${Method.woocommerce}products?&orderby=price&order=desc&per_page=9&stock_status=instock`, {method: "get", headers: {Authorization: Method.token}}),
    ]);

    let products = await productsRes.json();
    let categories = await categoriesRes.json();
    
    setCategories(categories);
    setProducts(products);
  }

  return (
    <Fragment>

      <HeaderTitan isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
      
      <Box className="content-box" style={{marginBottom: "30px"}}>
        {/* HERO CAROUSEL AREA */}
        <Section1 carouselData={mainCarouselData} />

        {/* SERVICE LIST AREA */}
        {/* <Section2 serviceList={serviceList} /> */}

        {/* TOP CATEGORIES AREA */}
        <Container >
          <Section3 categories={categories} />
        </Container>
        {/* <Section4 title="Elementos Destacados" products={products} /> */}


        {/* DEAL OF THE DAY PRODUCTS AREA */}

        <Section4 title="Elementos Destacados" products={products} />

        {/* NEW ARRIVALS AND BEST SELLER OFFER BANNER AREA */}
        {/* <Section5 />  */}

        {/* ELECTRONICS CATEGORY BASED PRODUCTS AREA */}
        {/* <Section6 data={carrousel} /> */}

        {/* SALES OFFER BANNERS AREA */}
        {/* <Section7 /> */}

        {/* MEN'S CATEGORY BASED PRODUCTS AREA */}
        {/* <Section6 data={menFashionProducts} /> */}

        {/* DISCOUNT OFFER BANNER AREA */}
        {/* <Section8 /> */}

        {/* WOMEN'S CATEGORY BASED PRODUCTS AREA */}
        {/* <Section6 data={womenFashionProducts} /> */}

        {/* FEATURES BRAND LIST AREA */}
        {/* <Section9 brands={brands as any} /> */}

        {/* SELECTED PRODUCTS AREA */}
        {/* <Section10 products={products} /> */}
      </Box>
      <MobileNavigationBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Footer1/>
    </Fragment>
  );
}

export default Home;
