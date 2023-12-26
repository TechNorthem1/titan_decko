"use client";
import { Fragment, useEffect, useState } from "react";
import Box from "@component/Box";
import {mainCarouselData as carrousel} from "@server/__db__/market-2/data"
import Section1 from "@sections/market-2/Section1";
import { PruebaComponent } from "@component/prueba";
import { HeaderTitan } from "@component/header_titan";
import { Footer1 } from "@component/footer";
import Section2 from "@sections/market-2/Section2";
import Section3 from "@sections/market-2/Section3";
import Section4 from "@sections/market-2/Section4";
import Section5 from "@sections/market-2/Section5";
import Section6 from "@sections/market-2/Section6";
import Section7 from "@sections/market-2/Section7";
import Section8 from "@sections/market-2/Section8";
import Section9 from "@sections/market-2/Section9";
import Section10 from "@sections/market-2/Section10";
import MobileNavigationBar from "@component/mobile-navigation";
import Helpers from "@helpers/Helpers";

const Home = () => {
  const [mainCarouselData, setMainCarouselData] = useState<any>([]);
  const [isAuthenticated, setIsAuthenticated]:any = useState<boolean>(false);

  useEffect(() => {getData();}, [isAuthenticated]);

  const getData = () => {
    let authenticated = Helpers.isAuthenticated("dataUser");
    setIsAuthenticated(authenticated);
    setMainCarouselData(carrousel);
  }


  return (
    <Fragment>

      <HeaderTitan isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
      
      <Box className="content-box">
        {/* HERO CAROUSEL AREA */}
        <Section1 carouselData={mainCarouselData} />
        <PruebaComponent />

        {/* SERVICE LIST AREA */}
        {/* <Section2 serviceList={serviceList} /> */}

        {/* TOP CATEGORIES AREA
        <Section3 categories={categories} />

        {/* DEAL OF THE DAY PRODUCTS AREA */}
        {/* <Section4 products={products} /> */}

        {/* NEW ARRIVALS AND BEST SELLER OFFER BANNER AREA */}
        {/* <Section5 />  */}

        {/* ELECTRONICS CATEGORY BASED PRODUCTS AREA */}
        {/* <Section6 data={electronicsProducts} /> */}

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
      <Footer1 />
    </Fragment>
  );
}

export default Home;
