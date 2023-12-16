"use client"
import { Fragment, useEffect, useState } from "react";
import Box from "@component/Box";
import api from "@utils/__api__/gadget";
import Navbar from "@component/navbar/Navbar";
import Section1 from "@sections/gadget-shop/Section1";
import Section2 from "@sections/gadget-shop/Section2";
import Section3 from "@sections/gadget-shop/Section3";
import Section4 from "@sections/gadget-shop/Section4";
import Section5 from "@sections/gadget-shop/Section5";
import Section6 from "@sections/gadget-shop/Section6";
import Section7 from "@sections/gadget-shop/Section7";

const GadgetShop = () => {
  const [twoBanner, setTwoBanner] = useState<any[]>([]);
  const [blogLists, setBlogLists] = useState<any[]>([]);
  const [topPickList, setTopPickList] = useState<any[]>([]);
  const [newArrivalsData, setNewArrivalsData] = useState<any[]>([]);
  const [mostViewedList, setMostViewedList] = useState<any[]>([]);
  const [mainCarouselData, setMainCarouselData] = useState<any[]>([]);
  const [featuredCategories, setFeaturedCategories] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    let twoBanner = await api.getTwoBanner();
    let blogLists = await api.getBlogLists();
    let topPickList = await api.getTopPicksList();
    let newArrivalsData = await api.getNewArrival();
    let mostViewedList = await api.getMostViewedList();
    let mainCarouselData = await api.getMainCarousel();
    let featuredCategories = await api.getFeaturedCategories();

    
    setTwoBanner(twoBanner);
    setBlogLists(blogLists);
    setTopPickList(topPickList);
    setNewArrivalsData(newArrivalsData);
    setMostViewedList(mostViewedList);
    setFeaturedCategories(mainCarouselData);
    setFeaturedCategories(featuredCategories);
  }


  return (
    <Fragment>
      {/* NAVIGATION BAR AREA */}
      <Navbar />

      <Box my="2rem">
        {/* TOP PICKS AND NEW WINTER PRODUCTS CAROUSEL AREA */}
        <Section1 mainCarousel={mainCarouselData} topPickList={topPickList} />

        {/* FEATURED CATEGORIES AREA */}
        <Section2 categories={featuredCategories} />

        {/* DISCOUNT BANNERS AREA */}
        <Section3 bannerData={twoBanner} />

        {/* MOST VIEWWD PRODUCTS CAROUSEL AREA */}
        <Section4 products={mostViewedList} />

        {/* NEW ARRIVAL PRODUCTS CAROUSEL AREA */}
        <Section5 products={newArrivalsData} />

        {/* OFFER BANNER AREA */}
        <Section6 />

        {/* BLOGS AREA */}
        <Section7 blogs={blogLists} />
      </Box>
    </Fragment>
  );
};

export default GadgetShop;
