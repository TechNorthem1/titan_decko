"use client";
import { FC, useEffect } from "react";
import Card from "@component/Card";
import Avatar from "@component/avatar";
import Rating from "@component/rating";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import CheckBox from "@component/CheckBox";
import TextField from "@component/text-field";
import { Accordion, AccordionHeader } from "@component/accordion";
import { H5, H6, Paragraph, SemiSpan } from "@component/Typography";
import useForm from "@hook/useForm";

type ProductFilterCard2Props = {getProduct?: (url:string) => void}

const ProductFilterCard2: FC<ProductFilterCard2Props> = ({getProduct}) => {
  const {form, changed} = useForm({});
  const render = (items: string[]) =>
    items.map((name) => (
      <Paragraph
        py="6px"
        pl="22px"
        key={name}
        fontSize="14px"
        color="text.muted"
        className="cursor-pointer"
      >
        {name}
      </Paragraph>
  ));
    
  useEffect(() => {updateUrl}, [form]);

  const updateUrl = () => {
    const minPrice = form["minPrice"];
    const maxPrice = form["maxPrice"];
    let url = (minPrice !== undefined && maxPrice !== undefined ) ? `&min_price=${minPrice}000&max_price=${maxPrice}000`
            : (minPrice === undefined && maxPrice !== undefined) ? `&min_price=6000&max_price=${maxPrice}000` 
            : (minPrice !== undefined && maxPrice === undefined) ? `&min_price=${minPrice}000&max_price=500000` 
            : "";
    getProduct(url)
  }

  return (
    <Card p="18px 27px" elevation={5}>
      <H6 mb="10px">Categorías</H6>

      {categroyList.map((item) =>
        item.child ? (
          <Accordion key={item.title} expanded>
            <AccordionHeader px="0px" py="6px" color="text.muted">
              <SemiSpan className="cursor-pointer" mr="9px">
                {item.title}
              </SemiSpan>
            </AccordionHeader>

            {render(item.child)}
          </Accordion>
        ) : (
          <Paragraph
            py="6px"
            fontSize="14px"
            key={item.title}
            color="text.muted"
            className="cursor-pointer"
          >
            {item.title}
          </Paragraph>
        )
      )}

      <Divider mt="18px" mb="24px" />

      {/* PRICE RANGE FILTER */}
      <H6 mb="16px">Precio</H6>
      <FlexBox justifyContent="space-between" alignItems="center">
        <TextField placeholder="0" type="number" name="minPrice" fullwidth onChange={changed} onKeyUp={updateUrl}/>

        <H5 color="text.muted" px="0.5rem">
          -
        </H5>

        <TextField placeholder="250" type="number" name="maxPrice" fullwidth onChange={changed} onKeyUp={updateUrl}/>
      </FlexBox>

      <Divider my="24px" />
    </Card>
  );
};

const categroyList = [
  {
    title: "Bath Preparations",
    child: ["Bubble Bath", "Bath Capsules", "Others"],
  },
  { title: "Eye Makeup Preparations" },
  { title: "Fragrance" },
  { title: "Hair Preparations" },
];

const otherOptions = ["On Sale", "In Stock", "Featured"];
const brandList = ["Maccs", "Karts", "Baars", "Bukks", "Luasis"];
const colorList = [
  "#1C1C1C",
  "#FF7A7A",
  "#FFC672",
  "#84FFB5",
  "#70F6FF",
  "#6B7AFF",
];

export default ProductFilterCard2;
