"use client";
import { FC, ReactNode } from "react";
import AppLayout from "../AppLayout";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import Navbar from "@component/navbar/Navbar";
import DashboardNavigation from "../DashboardNavigation";


// ======================================================
type Props = { children: ReactNode };
// ======================================================

const CustomerDashboardLayout: FC<Props> = ({ children }) => {
  return (
    <AppLayout >
      <Container my="2rem" marginTop={"20px"} marginBottom={"100px"}>
        <Grid container spacing={6} containerHeight="500px">
          {/* <Hidden as={Grid} item lg={3} xs={12} down={1024}>
            <DashboardNavigation />
          </Hidden> */}

          <Grid item lg={12} xs={12}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
};

export default CustomerDashboardLayout;
