import Box from '@component/Box';
import { Footer1 } from '@component/footer';
import { HeaderTitan } from '@component/header_titan';
import React, { Fragment } from 'react'
import Section1 from "@sections/producto/section1/Section1";

const Producto = () => {
  return (
    <Fragment>
        <HeaderTitan />

        <Box>
          <Section1 />

        </Box>


        <Footer1 />
    </Fragment>
  )
}


export default Producto;