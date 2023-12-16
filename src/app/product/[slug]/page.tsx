"use client"
import { Fragment, useEffect, useState } from "react";
import api from "@utils/__api__/products";
import ProductIntro from "@component/products/ProductIntro";
import ProductView from "@component/products/ProductView";

const ProductDetails = ({ params }: { params: { slug: string } }) => {
  const [shops, setShops] = useState<any>();
  const [relatedProducts, setRelatedProducts] = useState<any>();
  const [frequentlyBought, setFrequentlyBought] = useState<any>();
  const [product, setProduct] = useState<any>();

  useEffect(() => {getData();}, []);

  const getData = async () => {
    let shops = await api.getAvailableShop();
    let relatedProducts = await api.getRelatedProducts();
    let frequentlyBought = await api.getFrequentlyBought();
    let product: any = await api.getProduct(params.slug as string);

    setShops(shops);
    setRelatedProducts(relatedProducts);
    setFrequentlyBought(frequentlyBought);
    setProduct(product);
  }


  return (
    <Fragment>
      <ProductIntro
        id={product.id}
        price={product.price}
        title={product.title}
        images={product.images as string[]}
      />

      <ProductView
        shops={shops}
        relatedProducts={relatedProducts}
        frequentlyBought={frequentlyBought}
      />
    </Fragment>
  );
};

export default ProductDetails;
