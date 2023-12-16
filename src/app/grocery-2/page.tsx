"use client"
import Box from "@component/Box";
import api from "@utils/__api__/grocery-2";
import { Footer2 } from "@component/footer";
import Wrapper from "@sections/grocery-2/Wrapper";
import Section1 from "@sections/grocery-2/Section1";
import Section2 from "@sections/grocery-2/Section2";
import Section3 from "@sections/grocery-2/Section3";
import Section4 from "@sections/grocery-2/Section4";
import Section6 from "@sections/grocery-2/Section6";
import Section9 from "@sections/grocery-2/Section9";
import SidenavBar from "@sections/grocery-2/SidenavBar";
import { useEffect, useState } from "react";

const GroceryTwo = () => {
  const [serviceList, setServiceList] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [testimonials, setTestimonials] = useState<any>([]);
  const [dairyProducts, setDairyProducts] = useState<any>([]);
  const [navigationList, setNavigationList] = useState<any>([]);
  const [mainCarouselData, setMainCarouselData] = useState<any>([]);
  const [featuredProducts, setFeaturedProducts] = useState<any>([]);
  const [bestHomeProducts, setBestHomeProducts] = useState<any>([]);
  const [bestSellProducts, setBestSellProducts] = useState<any>([]);
  const [discountBanners, setDiscountBanners] = useState<any>([]);
  
  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    let serviceList = await api.getServices();
    let categories = await api.getCategories();
    let testimonials = await api.getTestimonials();
    let dairyProducts = await api.getDairyProducts();
    let navigationList = await api.getNavigationList();
    let mainCarouselData = await api.getMainCarousel();
    let featuredProducts = await api.getFeaturedProducts();
    let bestHomeProducts = await api.getBestHomeProducts();
    let bestSellProducts = await api.getBestSellProducts();
    let discountBanners = await api.getDiscountBannerList();

    setServiceList(serviceList);
    setCategories(categories);
    setTestimonials(testimonials);
    setDairyProducts(dairyProducts);
    setNavigationList(navigationList);
    setMainCarouselData(mainCarouselData);
    setFeaturedProducts(featuredProducts);
    setBestHomeProducts(bestHomeProducts);
    setBestSellProducts(bestSellProducts);
    setDiscountBanners(discountBanners);
  }

  return (
    <Wrapper>
      {/* SIDEBAR NAVIGATION AREA */}
      <Box className="sidenav" pt="1.5rem">
        <SidenavBar isFixedNave={true} navList={navigationList} />
      </Box>

      <Box className="content" pt="1.5rem">
        {/* HERO CAROUSEL AREA */}
        <Section1 carouselData={mainCarouselData} />

        {/* SERVICES AREA */}
        <Box mb="3rem" overflow="hidden">
          <Section2 services={serviceList} />
        </Box>

        {/* SHOP BY CATEGORY AREA */}
        <Box mb="3rem">
          <Section3 categories={categories} />
        </Box>

        {/* FEATURED PRODUCTS AREA */}
        <Box mb="3rem">
          <Section4 title="Featured Items" products={featuredProducts} />
        </Box>

        {/* BEST SELLER PRODUCTS AREA */}
        <Box mb="3rem">
          <Section4
            title="Best Seller in Your Area"
            products={bestSellProducts}
          />
        </Box>

        {/* DISCOUNT BANNER CAROUSEL AREA */}
        <Box mb="3rem">
          <Section6 cardList={discountBanners} />
        </Box>

        {/* BEST HOME PRODUCTS AREA */}
        <Box mb="3rem">
          <Section4
            title="Best of Home Essentials"
            products={bestHomeProducts}
          />
        </Box>

        {/* SNACK AND DRINKS PRODUCTS AREA */}
        <Box mb="3rem">
          <Section4
            title="Snacks, Drinks, Dairy & More"
            products={dairyProducts}
          />
        </Box>

        {/* TESTIMONIAL CAROUSEL AREA */}
        <Box mb="3rem">
          <Section9 testimonials={testimonials} />
        </Box>

        {/* FOOTER AREA */}
        <Footer2 />
      </Box>
    </Wrapper>
  );
};

export default GroceryTwo;
