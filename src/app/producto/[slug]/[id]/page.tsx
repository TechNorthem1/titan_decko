import Box from "@component/Box";
import { Footer1 } from "@component/footer";
import { HeaderTitan } from "@component/header_titan";
import React, { Fragment } from "react"
import Section1 from "@sections/producto/section1/Section1";
import Section2 from "@sections/producto/section2/Sections2";
import Section3 from "@sections/producto/section3/Sections3";
import Section4 from "@sections/producto/section4/Sections4";
import Section5 from "@sections/producto/section5/Sections5";
import api from "@utils/__api__/productos";


const Producto = async ({params}) => {
  let product = await api.getProduct(`products/${params.id}`)
  const url = `http://localhost:3000/producto/${params.slug}/${params.id}`;
  return (
    <Fragment>
        <HeaderTitan />

        <Box>
          <Section1 product={product} url={url}/>
          <Section2 />
          <Section3 />
          <Section4 />
          <Section5 />
        </Box>
        <Footer1 />
    </Fragment>
  )
}

export default Producto;