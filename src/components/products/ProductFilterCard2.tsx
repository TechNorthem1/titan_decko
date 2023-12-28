"use client";
import { FC, useEffect } from "react";
import Card from "@component/Card";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import { H5, H6, Paragraph, SemiSpan } from "@component/Typography";
import useForm from "@hooks/useForm";
import Link from "next/link";
import Select from "@component/Select";

type ProductFilterCard2Props = {getProduct?: (url:string) => void, categories?:any[]}

const ProductFilterCard2: FC<ProductFilterCard2Props> = ({getProduct, categories = []}) => {
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

  const updateUrl = ({target}) => {
    const value = target.value;
    let url = "";
    if(value !== "all"){
    
      // Expresión regular para extraer números con puntos
      const regex = /\d+\.\d+|\d+/g;

      // Extraer los números como cadenas
      const numerosComoCadenas = value.match(regex);
      
      // Convertir a números enteros
      const numerosComoEnteros = numerosComoCadenas?.map(num => parseInt(num.replace(/\./g, ''), 10));
      let minPrice = numerosComoEnteros[0];
      let maxPrice = numerosComoEnteros[1];
      
      // estructurando la url
      url = `&min_price=${minPrice}&max_price=${maxPrice}`;
    }
    getProduct(url)
  }

  return (
    <Card p="18px 27px" elevation={5} borderRadius={10}>
      <H6 mb="10px">Categorías</H6>

      {categories.length < 1 && 
        <Paragraph
          py="6px"
          fontSize="14px"
          key="1"
          color="text.muted"
          className="cursor-pointer"
        >
          No se encontraron categorias
        </Paragraph>
      }

      {categories.length >= 1 && categories.map((item:any) => (
        <Link href={`/productos/${item.id}`} >
          <Paragraph
            py="6px"
            fontSize="14px"
            key={item.name}
            color="text.muted"
            className="cursor-pointer"
          >
            {item.name}
          </Paragraph>
        </Link>
        ))}

      <Divider mt="18px" mb="24px" />

      {/* PRICE RANGE FILTER */}
      <H6 mb="16px">Precio</H6>
      <FlexBox justifyContent="space-between" alignItems="center">
        <select name="searchByPrice" id="searchByPrice" className="searchByPrice" aria-label="buscar productos por precios" onClick={updateUrl}>
          <option disabled>Filtrar por precios</option>
          <option value="all" selected>Todos los productos</option>
          <option value="0 - 100.000">$0 - $100.000</option>
          <option value="100.000 - 200.000">$100.000 - $200.000</option>
          <option value="200.000 - 300.000">$200.000 - $300.000</option>
          <option value="300.000 - 500.000">$300.000 - $500.000</option>
        </select>
      </FlexBox>
      <Divider my="24px" />
    </Card>
  );
};


export default ProductFilterCard2;