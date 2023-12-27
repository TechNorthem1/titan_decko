"use client";
import { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import Sticky from "@component/sticky";
import { Footer1 } from "@component/footer";
import MobileNavigationBar from "@component/mobile-navigation";
import StyledAppLayout from "./AppLayoutStyle";
import { HeaderTitan } from "@component/header_titan";
import Helpers from "@helpers/Helpers";

// ===============================================================================
type Props = { title?: string; navbar?: ReactElement; children: ReactNode };
// ===============================================================================

const AppLayout: FC<Props> = ({
  navbar,
  children,
  title = "React Next.js Ecommerce Template",
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {getData()}, [])

  const getData = () => {
    let authenticated = Helpers.isAuthenticated("dataUser");
    setIsAuthenticated(authenticated)
  }


  return (
    <StyledAppLayout>
      <Sticky fixedOn={0}>
        <HeaderTitan isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      </Sticky>

      {navbar ? <div className="section-after-sticky">{navbar}</div> : null}

      {!navbar ? (
        <div className="section-after-sticky">{children}</div>
      ) : (
        children
      )}

      <MobileNavigationBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
      <Footer1 />
    </StyledAppLayout>
  );
  }

export default AppLayout;
