import { Fragment } from "react";
import Hidden from "@component/hidden";
import api from "@utils/__api__/orders";
import TableRow from "@component/TableRow";
import { H5 } from "@component/Typography";
import OrderRow from "@component/orders/OrderRow";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import OrdersPagination from "@component/orders/OrdersPagination";
import {colors } from "@utils/themeColors";

const OrderList = async () => {
  const orderList = await api.getOrders();

  return (
    <Fragment>
      <DashboardPageHeader title="Mis Ordenes" iconName="bag_filled" />

      <Hidden down={769}>
        <TableRow
          boxShadow="none"
          padding="0px 18px"
          backgroundColor="transparent"
        >
          <H5 color={colors.titan.dark} my="0px" mx="6px" textAlign="left">
            Orden #
          </H5>

          <H5 color={colors.titan.dark} my="0px" mx="6px" textAlign="left">
            Estado
          </H5>

          <H5 color={colors.titan.dark} my="0px" mx="6px" textAlign="left">
            Fecha de compra
          </H5>

          <H5 color={colors.titan.dark} my="0px" mx="6px" textAlign="left">
            Total
          </H5>

          <H5 flex="0 0 0 !important" color={colors.titan.dark} px="22px" my="0px" />
        </TableRow>
      </Hidden>

      {orderList.map((item) => (
        <OrderRow order={item} key={item.id} />
      ))}

      <OrdersPagination orderList={orderList} />
    </Fragment>
  );
};

export default OrderList;
