// import Box from "@component/Box";
// import Footer from "@sections/landing/Footer";
// import Section1 from "@sections/landing/Section1";
// import Section2 from "@sections/landing/Section2";
// import Section3 from "@sections/landing/Section3";
// import Section4 from "@sections/landing/Section4";
// import Section5 from "@sections/landing/Section5";
import { Fragment } from "react";
import Box from "@component/Box";
import api from "@utils/__api__/market-2";
import Navbar from "@component/navbar/Navbar";
import Section1 from "@sections/market-2/Section1";
import Section2 from "@sections/market-2/Section2";
import Section3 from "@sections/market-2/Section3";
import Section4 from "@sections/market-2/Section4";
import Section5 from "@sections/market-2/Section5";
import Section6 from "@sections/market-2/Section6";
import Section7 from "@sections/market-2/Section7";
import Section8 from "@sections/market-2/Section8";
import Section9 from "@sections/market-2/Section9";
import Section10 from "@sections/market-2/Section10";
import { PruebaComponent } from "@component/prueba";
import { HeaderTitan } from "@component/header_titan";

export default async function Home() {
  const mainCarouselData = await api.getMainCarouselData();
  
  return (
    <Fragment>

      <HeaderTitan />

      <Box>
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
    </Fragment>
  );
}
