"use client";
import Head from "next/head";
import { FC, ReactNode } from "react";
import Topbar from "@component/topbar";
import { Header } from "@component/header";
import { Footer1 } from "@component/footer";
import Navbar from "@component/navbar/Navbar";
import MobileNavigationBar from "@component/mobile-navigation";
import StyledAppLayout from "./AppLayoutStyle";

// ==============================================================
type Props = { title?: string; children: ReactNode };
// ==============================================================

const SaleLayout1: FC<Props> = ({
  children,
  title = "Titan Decko",
}) => (
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
      <script  {...{src:"https://kit.fontawesome.com/b13e9656a1.js", crossorigin: "anonymous"}} />
      <title>{title}</title>
    </Head>

    <Topbar />
    <Header />
    <Navbar />

    {children}

    <MobileNavigationBar />
    <Footer1 />
  </StyledAppLayout>
);

export default SaleLayout1;
