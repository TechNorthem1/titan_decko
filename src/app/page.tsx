"use client";
import { Fragment, useEffect, useState } from "react";
import Box from "@component/Box";
import {mainCarouselData as carrousel} from "@server/__db__/market-2/data"
import Section1 from "@sections/market-2/Section1";
import { HeaderTitan } from "@component/header_titan";
import { Footer1 } from "@component/footer";
import Section3 from "@sections/categorias/Section3";
import Section4 from "@sections/market-2/Section4";
import MobileNavigationBar from "@component/mobile-navigation";
import Helpers from "@helpers/Helpers";
import Method from "@helpers/Method";
import Container from "@component/Container";
import Loading from "@component/loading/Loading";

const Home = () => {
  const [mainCarouselData, setMainCarouselData] = useState<any>([]);
  const [isAuthenticated, setIsAuthenticated]:any = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(false)
  }

  return (
    <Fragment>

      <HeaderTitan isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
      
      <Box className="content-box" style={{marginBottom: "30px"}}>
        {/* HERO CAROUSEL AREA */}
        <Section1 carouselData={mainCarouselData}/>


        {/* TOP CATEGORIES AREA */}
        <Container marginTop={50}>
          <Loading active={loading} setActivate={setLoading} classCss={""} />
          <Section3 categories={categories} />
        </Container>

        {!loading && <Section4 title="Elementos Destacados" products={products} />}

      </Box>
      <MobileNavigationBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Footer1/>
    </Fragment>
  );
}

export default Home;
