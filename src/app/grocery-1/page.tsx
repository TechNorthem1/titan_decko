"use client"
import { Fragment, useEffect, useState } from "react";
import api from "@utils/__api__/grocery-1";
import { Footer2 } from "@component/footer";
import Section1 from "@sections/grocery-1/Section1";
import Section2 from "@sections/grocery-1/Section2";
import Section3 from "@sections/grocery-1/Section3";
import Section4 from "@sections/grocery-1/Section4";
import Section5 from "@sections/grocery-1/Section5";
import SideNavbar from "@component/sidenav/SideNavbar";
import SidenavContainer from "@component/SidenavContainer";

const GroceryOne = () => {
  const FIXED_ID = "services-area";
  const [products, setProducts] = useState<any>([]);
  const [serviceList, setServiceList] = useState<any>([]);
  const [popularProducts, setPopularProducts] = useState<any>([]);
  const [trendingProducts, setTrendingProducts] = useState<any>([]);
  const [grocery1NavList, setGrocery1NavList] = useState<any>([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    let products = await api.getProducts();
    let serviceList = await api.getServices();
    let popularProducts = await api.getPopularProducts();
    let trendingProducts = await api.getTrendingProducts();
    let grocery1NavList = await api.getGrocery1Navigation();

    setProducts(products);
    setServiceList(serviceList);
    setPopularProducts(popularProducts);
    setTrendingProducts(trendingProducts);
    setGrocery1NavList(grocery1NavList);
  }

  return (
    <Fragment>
      {/* HERO AREA */}
      <Section1 />

      {/* SERVICES AREA */}
      <Section2 id={FIXED_ID} services={serviceList} />

      {/* SIDEBAR NAVIGATION WITH MAIN CONTENT AREA */}
      <SidenavContainer
        navFixedComponentID={FIXED_ID}
        SideNav={<SideNavbar navList={grocery1NavList} />}
      >
        {/* POPULAR PRODUCTS CAROUSEL AREA */}
        <Section3 title="Popular Products" products={popularProducts} />

        {/* TRENDING PRODUCTS CAROUSEL AREA */}
        <Section3 title="Trending Products" products={trendingProducts} />

        {/* ALL PRODUCTS AREA */}
        <Section4 products={products} />

        {/* DISCOUNT BANNER AREA */}
        <Section5 />

        {/* FOOTER AREA */}
        <Footer2 />
      </SidenavContainer>
    </Fragment>
  );
};

export default GroceryOne;
