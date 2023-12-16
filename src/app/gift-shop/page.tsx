"use client"
import { Fragment, useEffect, useState } from "react";
import Container from "@component/Container";
import Navbar from "@component/navbar/Navbar";
import Section1 from "@sections/gift-shop/Section1";
import Section5 from "@sections/gift-shop/Section5";
import Section6 from "@sections/gift-shop/Section6";
import api from "@utils/__api__/gift";
import ContentBox from "@sections/gift-shop/ContentBox";
import Category from "@models/category.model";

const GiftShop = async () => {
  const [allProducts, setAllProducts] = useState<any>([]);  
  const [serviceList, setServiceList] = useState<any>([]);
  const [topCategories, setTopCategories] = useState<any>([]);
  const [carouselData, setCarouselData] = useState<any>([]);
  const [popularProducts, setPopularProducts] = useState<any>([]);
  const [topSailedProducts, setTopSailedProducts] = useState<any>([]);
  const [categoryNavigation, setCategoryNavigation] = useState<any>([]);

  useEffect(() => {
    getData();
  }, [])
    
  const getData = async () => {
    let allProducts = await api.getAllProducts();
    let serviceList = await api.getServiceList();
    let topCategories = await api.getTopCategories();
    let carouselData = await api.getMainCarouselData();
    let popularProducts = await api.getPopularProducts();
    let topSailedProducts = await api.getTopSailedProducts();
    let categoryNavigation = await api.getCategoryNavigation();

    setAllProducts(allProducts);
    setServiceList(serviceList);
    setTopCategories(topCategories);
    setCarouselData(carouselData);
    setPopularProducts(popularProducts);
    setTopSailedProducts(topSailedProducts);
    setCategoryNavigation(categoryNavigation);
  }


  return (
    <Fragment>
      {/* NAVBAR AREA */}
      <Navbar />

      {/* HERO CAROUSEL AREA */}
      <Section1 carouselData={carouselData} />

      <Container>
        <ContentBox
          serviceList={serviceList}
          topCategories={topCategories as Category[]}
          categoryNavigation={categoryNavigation}
        />

        {/* POPULAR PRODUCTS AREA */}
        <Section5 products={popularProducts} title="Popular Items" />

        {/* TOP SALED PRODUCTS AREA */}
        <Section5 products={topSailedProducts} title="Top Saled Items" />

        {/* ALL PRODUCTS AREA */}
        <Section6 products={allProducts} />
      </Container>
    </Fragment>
  );
};

export default GiftShop;
