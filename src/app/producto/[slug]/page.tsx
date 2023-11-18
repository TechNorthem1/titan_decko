import React, { Fragment } from 'react'
import Loading from 'app/product/[slug]/loading'

const page = ({params}) => {

    console.log(params)

  return (
    <Fragment>
        <Loading /> 
    </Fragment>
  )
}


export default page;