"use client"
import axios from "axios";
import Container from "@component/Container";
import SaleProducts2 from "@component/sale-page-2/SaleProducts2";
import { SearchParams } from "interfaces";
import { useEffect, useState } from "react";

const SalePage2 = ({ searchParams }: SearchParams) => {
  const PAGE_SIZE = 28;
  const PAGE = searchParams?.page ? Number(searchParams.page) : 1;
  const params = { page: PAGE, pageSize: PAGE_SIZE };
  const [data, setData] = useState<any>();

  useEffect(() => {getData();}, [])

  const getData = async () => {
    let { data } = await axios.get("/api/products", {
      params: { page: PAGE, pageSize: PAGE_SIZE },
    });

    setData(data);
  }

  return (
    <Container mt="2rem">
      <SaleProducts2 products={data.result} meta={data.meta} />
    </Container>
  );
};

export default SalePage2;
