"use client"
import React, { Fragment } from 'react'
import Sticky from "@component/sticky";
import { Header } from "@component/header";
import Head from "next/head";
import "./style.css"


export const HeaderTitan = () => {

    return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Comprueba tu web gratis con el Software SEO y las herramientas de Seobility: sigue los consejos de optimización on page para mejorar tu posicionamiento en Google" />
        <meta name="keywords" content="palabras claves" />
        <meta name="author" content="nombre del autor" />
        <meta name="copyright" content="derechos de autor" />
        <meta http-equiv="cache-control" content="no-cache"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="nofollow" />
        <link rel="shortcut icon" href="/assets/images/icons/icon_titan.webp" type="image/x-icon" />
        <script  {...{src:"https://kit.fontawesome.com/b13e9656a1.js", crossorigin: "anonymous"}} />
        <title>Titan Decko</title>
      </Head>

      <Sticky fixedOn={0}>
        <Header />
      </Sticky>
      {/* NAVBAR AREA */}
    </Fragment>
  )
}
