"use client"
import { Fragment, useEffect, useState } from "react";
import api from "@utils/__api__/grocery-3";
import Container from "@component/Container";
import Section1 from "@sections/grocery-3/Section1";
import Section2 from "@sections/grocery-3/Section2";
import Section3 from "@sections/grocery-3/Section3";
import Section4 from "@sections/grocery-3/Section4";

const GroceryThree = () => {
  const [offerCards , setOfferCards] = useState<any>([]);
  const [allProducts , setAllProducts] = useState<any>([]);
  const [mainCarouselData , setMainCarouselData] = useState<any>([]);
  const [topSailedProducts , setTopSailedProducts] = useState<any>([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = async() => {
    let offerCards = await api.getOfferCards();
    let allProducts = await api.getAllProducts();
    let mainCarouselData = await api.getMainCarousel();
    let topSailedProducts = await api.getTopSailedProducts();

    setOfferCards(offerCards);
    setAllProducts(allProducts);
    setMainCarouselData(mainCarouselData);
    setTopSailedProducts(topSailedProducts);
  }

  return (
    <Fragment>
      {/* HERO CAROUSEL AREA */}
      <Section1 carouselData={mainCarouselData} />

      <Container>
        {/* OFFER PRODUCTS AREA */}
        <Section2 offerProducts={offerCards} />

        {/* TOP SAILED PRODUCTS AREA */}
        <Section3 products={topSailedProducts} />

        {/* ALL PRODUCTST AREA */}
        <Section4 products={allProducts} />
      </Container>
    </Fragment>
  );
};

export default GroceryThree;
