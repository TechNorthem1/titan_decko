"use client"
import { Fragment, useEffect, useState } from "react";
import Box from "@component/Box";
import api from "@utils/__api__/fashion-3";
import Navbar from "@component/navbar/Navbar";
import Section1 from "@sections/fashion-3/Section1";
import Section2 from "@sections/fashion-3/Section2";
import Section3 from "@sections/fashion-3/Section3";
import Section4 from "@sections/fashion-3/Section4";
import Section5 from "@sections/fashion-3/Section5";
import Section6 from "@sections/fashion-3/Section6";
import Section7 from "@sections/fashion-3/Section7";
import Section8 from "@sections/fashion-3/Section8";

const FashionThree = () => {
  const [blogs, setBlogs] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [services, setServices] = useState<any>([]);
  const [featureProducts, setFeatureProducts] = useState<any>([]);
  const [mainCarouselData, setMainCarouselData] = useState<any>([]);

  useEffect(() => {
    getData();
  },[])

  const getData = async () => {
    let blogs = await api.getBlogs();
    let products = await api.getProducts();
    let services = await api.getServices();
    let featureProducts = await api.getFeatureProducts();
    let mainCarouselData = await api.getMainCarouselData();

    setBlogs(blogs);
    setProducts(products);
    setServices(services);
    setFeatureProducts(featureProducts);
    setMainCarouselData(mainCarouselData);
  }


  return (
    <Fragment>
      {/* NAVBAR AREA */}
      <Navbar />

      <Box bg="white" pb="4rem">
        {/* HERO CAROUSEL AREA */}
        <Section1 carouselData={mainCarouselData} />

        {/* MEN AND WOMEN OFFERS AREA */}
        <Section2 />

        {/* BEST SELLING PRODUCTS AREA */}
        <Section3 products={products} />

        {/* TOP CATEGORIES AREA */}
        <Section4 />

        {/* SALE OFFER BANNERS AREA */}
        <Section5 />

        {/* FEATURED PRODUCTS AREA */}
        <Section6 products={featureProducts} />

        {/* SERVICE LIST AREA */}
        <Section7 services={services} />

        {/* BLOG LIST AREA */}
        <Section8 blogs={blogs} />
      </Box>
    </Fragment>
  );
};

export default FashionThree;
