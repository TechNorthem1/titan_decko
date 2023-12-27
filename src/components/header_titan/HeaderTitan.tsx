"use client"
import React, { Dispatch, FC, Fragment, SetStateAction, useEffect, useState } from 'react'
import Sticky from "@component/sticky";
import { Header } from "@component/header";
"use client"
import "./style.css"
import useResponsive from '@hook/useResposive';


interface HeaderTitanProps {
  isAuthenticated?: boolean;
  setIsAuthenticated?:  Dispatch<SetStateAction<boolean>> ;
}

export const HeaderTitan:FC<HeaderTitanProps> = ({isAuthenticated, setIsAuthenticated}) => {
  const {width, height}:any = useResponsive();
  const [isResponsive, setResponsive] = useState<any>();

  useEffect(() => {
    let responsive = width < 901;
    setResponsive(responsive);
  }, [width]); 

  

  return (
    <Fragment>

      <Sticky fixedOn={0}>
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} isResponsive={isResponsive}/>
      </Sticky>
      {/* NAVBAR AREA */}
    </Fragment>
  )
}
