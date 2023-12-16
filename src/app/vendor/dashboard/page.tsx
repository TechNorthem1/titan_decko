"use client"
import { Fragment, useEffect, useState } from "react";
import api from "@utils/__api__/dashboard";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import DashboardContent from "@component/vendor/dashboard/DashboardContent";

const VendorDashboard = () => {
  const [sales, setSales] = useState<any>([]);
  const [summeryCards, setSummeryCards] = useState<any>([]);
  const [countrySales, setCountrySales] = useState<any>([]);

  useEffect(() => {getData()}, []);

  const getData = async () => {
    const sales = await api.getSales();
    const summeryCards = await api.getSummeryCards();
    const countrySales = await api.getCountryBasedSales();

    setSales(sales);
    setSummeryCards(summeryCards);
    setCountrySales(countrySales);
  }
  
  

  return (
    <Fragment>
      <DashboardPageHeader title="Dashboard" iconName="bag_filled" />

      <DashboardContent
        sales={sales}
        summeryCards={summeryCards}
        countrySales={countrySales}
      />
    </Fragment>
  );
};

// VendorDashboard.layout = VendorDashboardLayout;

export default VendorDashboard;
