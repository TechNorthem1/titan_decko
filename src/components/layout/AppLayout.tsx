"use client";
import { FC, ReactElement, ReactNode } from "react";
import Head from "next/head";
import Sticky from "@component/sticky";
import { Header } from "@component/header";
import { Footer1 } from "@component/footer";
import MobileNavigationBar from "@component/mobile-navigation";
import StyledAppLayout from "./AppLayoutStyle";

// ===============================================================================
type Props = { title?: string; navbar?: ReactElement; children: ReactNode };
// ===============================================================================

const AppLayout: FC<Props> = ({
  navbar,
  children,
  title = "React Next.js Ecommerce Template",
}) => (
  <StyledAppLayout>
    <Sticky fixedOn={0}>
      <Header />
    </Sticky>

    {navbar ? <div className="section-after-sticky">{navbar}</div> : null}

    {!navbar ? (
      <div className="section-after-sticky">{children}</div>
    ) : (
      children
    )}

    <MobileNavigationBar />
    <Footer1 />
  </StyledAppLayout>
);

export default AppLayout;
