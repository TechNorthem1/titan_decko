"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import Sticky from "@component/sticky";
import { HeaderTwo } from "@component/header";
import Navbar2 from "@component/navbar/Navbar2";
import MobileNavigationBar from "@component/mobile-navigation";
import StyledAppLayout from "./AppLayoutStyle";
import { HeaderTitan } from "@component/header_titan/HeaderTitan";
import Box from "@component/Box";
import Helpers from "@helpers/Helpers";

// =========================================================================
type Props = { title?: string; showNavbar?: boolean; children: ReactNode, };
// =========================================================================

const GroceryLayout: FC<Props> = ({
  children,
  showNavbar = true,
  title = "Titan Decko",
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {getData();}, [isAuthenticated]);

  const getData = () => {
    let authenticated = Helpers.isAuthenticated("dataUser");
    setIsAuthenticated(authenticated)
  }


  return (
    <StyledAppLayout>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Comprueba tu web gratis con el Software SEO y las herramientas de Seobility: sigue los consejos de optimización on page para mejorar tu posicionamiento en Google" />
        <meta name="keywords" content="palabras claves" />
        <meta name="author" content="nombre del autor" />
        <meta name="copyright" content="derechos de autor" />
        <meta http-equiv="cache-control" content="no-cache"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="nofollow" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preload" />
        <link rel="shortcut icon" href="/assets/images/icons/icon_titan.webp" type="image/x-icon" />
        <title>{title}</title>
      </Head>

      {/* HEADER AREA */}
      <Sticky fixedOn={0}>
        <HeaderTitan isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
      </Sticky>
      <Box className="content-box">
        {children}
      </Box>

      {/* SMALLER DEVICE NAVIGATION AREA */}
      <MobileNavigationBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
    </StyledAppLayout>
  )};

export default GroceryLayout;
