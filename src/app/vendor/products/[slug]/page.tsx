"use client"
import axios from "axios";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Button } from "@component/buttons";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import ProductUpdateForm from "@component/vendor/products/ProductUpdateForm";

const categoryOptions = [
  { label: "Fashion", value: "fashion" },
  { label: "Gadget", value: "gadget" },
];

const ProductDetails = ({ params }: { params: { slug: string } }) => {
  const [data, setData] = useState<any>();

  useEffect(() => {getData();}, [])

  const getData = async () => {
    let { data } = await axios.get("/api/products/slug", {
      params: { slug: params.slug as string },
    });

    setData(data);
  }

  return (
    <Fragment>
      <DashboardPageHeader
        title="Edit Product"
        iconName="delivery-box"
        button={
          <Link href="/vendor/products">
            <Button color="primary" bg="primary.light" px="2rem">
              Volver a la lsita de productos
            </Button>
          </Link>
        }
      />

      <ProductUpdateForm product={data} categoryOptions={categoryOptions} />
    </Fragment>
  );
};

export default ProductDetails;
