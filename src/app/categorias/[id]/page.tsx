"use client"
import Box from "@component/Box";
import { categoryNavigation as navigation  } from "@server/__db__/grocery-2/data";
import { mainCarouselData as main } from "@server/__db__/grocery-2/data";
import { serviceList as service  } from "@server/__db__/grocery-2/data";
import { Footer1 } from "@component/footer";
import Wrapper from "@sections/categorias/Wrapper";
import Section1 from "@sections/categorias/Section1";
import Section2 from "@sections/categorias/Section2";
import Section3 from "@sections/categorias/Section3";
import Section4 from "@sections/categorias/Section4";
import SidenavBar from "@sections/categorias/SidenavBar";
import { useEffect, useState } from "react";
import Method from "@helpers/Method";
import Loading from "@component/loading/Loading";


const GroceryTwo = ({params}:any) => {
  const [serviceList, setServiceList] = useState<any[]>(service);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [navigationList, setNavigationList] = useState<any[]>(navigation);
  const [mainCarouselData, setMainCarouselData] = useState<any[]>(main);
  const [activate, setActivate] = useState<boolean>(true);
  
  // useEffect para llamar getData en el montaje del componente
  useEffect(() => {
    const getData = async () => {
      try {
        // obtengo los datos
        let categories_res = await fetch(`${Method.woocommerce}products/categories?parent=${params.id}&per_page=6`, {method: "GET", headers: {Authorization: Method.token}}); 
        let products_res = await fetch(`${Method.woocommerce}products?category=${params.id}&order=desc&orderby=price&per_page=8&stock_status=instock`, {method: "GET", headers: {Authorization: Method.token}});
        let categories = await categories_res.json();
        let products = await products_res.json();
        
        // Actualiza el estado con los nuevos datos
        setCategories(categories);
        setProducts(products);
        setActivate(false)
      } catch (error) {
        // Manejo de errores
        error;
      }
    };

 
    getData();
  }, []);

  useEffect(()=> {}, [products, categories])

  return (
    
    <Wrapper>
      {/* SIDEBAR NAVIGATION AREA */}
      <Box className="sidenav" pt="1.5rem">
        <SidenavBar isFixedNave={true} />
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
          <Loading active={activate} setActivate={setActivate} classCss={""}/>
        </Box>

        {!activate && <Box mb="3rem">
          <Section4 title="Elementos Destacados" products={products} params={params}/>
        </Box>}


        {/* FOOTER AREA */}
        <Footer1 />
      </Box>
    </Wrapper>
  );
};

export default GroceryTwo;
