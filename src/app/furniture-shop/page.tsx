"use client"
import { Fragment, useEffect, useState } from "react";
import api from "@utils/__api__/furniture";
import Container from "@component/Container";
import Navbar from "@component/navbar/Navbar";
import Section1 from "@sections/furniture-shop/Section1";
import Section3 from "@sections/furniture-shop/Section3";
import Section4 from "@sections/furniture-shop/Section4";
import ContentBox from "@sections/furniture-shop/ContentBox";

const FurnitureShop = () => {
  const [topNewProducts, setTopNewProducts] = useState<any>([]);
  const [mainCarouselData, setMainCarouselData] = useState<any>([]);
  const [furnitureProducts, setFurnitureProducts] = useState<any>([]);
  const [sidebarNavList, setSidebarNavList] = useState<any>([]);
  const [topSellingProducts, setTopSellingProducts] = useState<any>([]);

  useEffect(() => {
    getData();
  })

  const getData = async () => {
    let topNewProducts = await api.getTopNewProducts();
    let mainCarouselData = await api.getMainCarouselData();
    let furnitureProducts = await api.getFurnitureProducts();
    let sidebarNavList = await api.getFurnitureShopNavList();
    let topSellingProducts = await api.getTopSellingProducts();


    setTopNewProducts(topNewProducts);
    setMainCarouselData(mainCarouselData);
    setFurnitureProducts(furnitureProducts);
    setSidebarNavList(sidebarNavList);
    setTopSellingProducts(topSellingProducts);
  }

  return (
    <Fragment>
      {/* NAVBAR AREA */}
      <Navbar />

      {/* HERO CAROUSEL AREA */}
      <Section1 mainCarouselData={mainCarouselData} />

      <Container>
        <ContentBox sidebarNavList={sidebarNavList} />

        {/* TOP NEW PRODUCTS AREA */}
        <Section3 products={topNewProducts} title="Top New Product" />

        {/* TOP SELLING PRODUCTS AREA */}
        <Section3 products={topSellingProducts} title="Top Selling Product" />

        {/* ALL PRODUCTS AREA  */}
        <Section4 products={furnitureProducts} />
      </Container>
    </Fragment>
  );
};

export default FurnitureShop;
