"use client"
import { Fragment, useEffect, useState } from "react";
import Box from "@component/Box";
import api from "@utils/__api__/fashion-1";
import Container from "@component/Container";
import Navbar from "@component/navbar/Navbar";
import Section1 from "@sections/fashion-1/Section1";
import Section2 from "@sections/fashion-1/Section2";
import Section3 from "@sections/fashion-1/Section3";
import Section4 from "@sections/fashion-1/Section4";
import Section5 from "@sections/fashion-1/Section5";
import Section6 from "@sections/fashion-1/Section6";
import Section7 from "@sections/fashion-1/Section7";
import Section8 from "@sections/fashion-1/Section8";
import Section9 from "@sections/fashion-1/Section9";

const FashionOne = () => {
  const [hotDealList, setHotDealList] = useState<any[]>([]);
  const [serviceList, setServiceList] = useState<any[]>([]);
  const [flashDealsData, setFlashDealsData] = useState<any[]>([]);
  const [trendingItems, setTrendingItems] = useState<any[]>([]);
  const [newArrivalsData, setNewArrivalsData] = useState<any[]>([]);
  const [dealOfTheWeek, setDealOfTheWeek] = useState<any[]>([]);

  useEffect(() => {
    getDataContent();
  }, [])

  const getDataContent = async () => {
    let hotDealList = await api.getHotDealList();
    let serviceList = await api.getServiceList();
    let flashDealsData = await api.getFlashDeals();
    let trendingItems = await api.getTrendingItems();
    let newArrivalsData = await api.getNewArrivals();
    let dealOfTheWeek = await api.getDealOfTheWeekList();

    setHotDealList(hotDealList);
    setServiceList(serviceList);
    setFlashDealsData(flashDealsData);
    setTrendingItems(trendingItems);
    setNewArrivalsData(newArrivalsData);
    setDealOfTheWeek(dealOfTheWeek);
  }
  

  return (
    <Fragment>
      {/* NAVBAR AREA */}
      <Navbar />

      <Container my="2rem">
        {/* DISCOUNT BANNER AREA */}
        <Section1 />

        {/* SERVICES AND SPECIAL OFFER AREA */}
        <Box mb="3.75rem">
          <Section2 />
        </Box>

        {/* FLASH DEAL PRODUCTS AREA */}
        <Section3 products={flashDealsData} />

        {/* NEW ARRIVAL PRODUCTS AREA */}
        <Section4 products={newArrivalsData} />

        {/* DEALS OF WEEK PRODUCTS AREA */}
        <Section5 list={dealOfTheWeek} />

        {/* DEAL OF THE DAY CAROUSEL AREA */}
        <Section6 list={hotDealList} />

        {/* TRENDING PRODUCTS AREA */}
        <Section7 products={trendingItems} />

        {/* SERVICES AREA */}
        <Section8 serviceList={serviceList} />

        {/* NEWSLETTER AREA */}
        <Section9 />
      </Container>
    </Fragment>
  );
};

export default FashionOne;
