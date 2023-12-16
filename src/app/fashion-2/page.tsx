"use client"
import { Fragment, useEffect, useState } from "react";
import Box from "@component/Box";
import api from "@utils/__api__/fashion-2";
import Navbar from "@component/navbar/Navbar";
import Section1 from "@sections/fashion-2/Section1";
import Section2 from "@sections/fashion-2/Section2";
import Section3 from "@sections/fashion-2/Section3";
import Section4 from "@sections/fashion-2/Section4";
import Section5 from "@sections/fashion-2/Section5";
import Section6 from "@sections/fashion-2/Section6";
import Section7 from "@sections/fashion-2/Section7";
import Section8 from "@sections/fashion-2/Section8";
import Section9 from "@sections/fashion-2/Section9";
import Section10 from "@sections/fashion-2/Section10";

const FashionTwo = () => {
  const [blogs, setBlogs] = useState<any>([]);
  const [brands, setBrands] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [serviceList, setServiceList] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [saleProducts, setSaleProducts] = useState<any>([]);
  const [latestProducts, setLatestProducts] = useState<any>([]);
  const [popularProducts, setPopularProducts] = useState<any>([]);
  const [featureProducts, setFeatureProducts] = useState<any>([]);
  const [bestWeekProducts, setBestWeekProducts] = useState<any>([]);
  const [mainCarouselData, setMainCarouselData] = useState<any>([]);

  useEffect(() => {
    getDataContent();
  }, []);

  const getDataContent = async () => {
    let blogs = await api.getBlogs();
    let brands = await api.getBrands();
    let products = await api.getProducts();
    let serviceList = await api.getServices();
    let categories = await api.getCategories();
    let saleProducts = await api.getSaleProducts();
    let latestProducts = await api.getLatestProducts();
    let popularProducts = await api.getPopularProducts();
    let featureProducts = await api.getFeatureProducts();
    let bestWeekProducts = await api.getBestWeekProducts();
    let mainCarouselData = await api.getMainCarouselData();

    setBlogs(blogs);
    setBrands(brands);
    setProducts(products);
    setServiceList(serviceList);
    setCategories(categories);
    setSaleProducts(saleProducts);
    setLatestProducts(latestProducts);
    setPopularProducts(popularProducts);
    setFeatureProducts(featureProducts);
    setBestWeekProducts(bestWeekProducts);
    setMainCarouselData(mainCarouselData);
  }


  return (
    <Fragment>
      {/* NAVBAR AREA */}
      <Navbar />

      <Box bg="white">
        {/* HERO CAROUSEL AREA */}
        <Section1 data={mainCarouselData} />

        {/* SERVICES AREA */}
        <Section2 serviceList={serviceList} />

        {/* BEST SELLING CATEGORIES AREA */}
        <Section3 categories={categories} />

        {/* BEST SELLING PRODUCTS AREA */}
        <Section4 products={products} />

        {/* DISCOUNT OFFER BANNERS AREA */}
        <Section5 />

        {/* FEATURED PRODUCTS AREA */}
        <Section6 products={featureProducts} />

        {/* SUMMER SALE OFFER AREA */}
        <Section7 />

        {/* LATEST ARTICLES AREA */}
        <Section8 blogs={blogs} />

        {/* CLIENTS CAROUSEL AREA */}
        <Section9 brands={brands} />

        {/* SALE, LATEST, POPULAR PRODUCTS AREA */}
        <Section10
          saleProducts={saleProducts}
          latestProducts={latestProducts}
          popularProducts={popularProducts}
          bestWeekProducts={bestWeekProducts}
        />
      </Box>
    </Fragment>
  );
};

export default FashionTwo;
