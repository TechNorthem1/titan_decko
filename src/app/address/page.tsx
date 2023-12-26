"use client"
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Icon from "@component/icon/Icon";
import api from "@utils/__api__/address";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import Pagination from "@component/pagination";
import Typography from "@component/Typography";
import { IconButton } from "@component/buttons";
import AddNewAddress from "@sections/address/AddNewAddress";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import AddressPagination from "@sections/address/AddressPagination";
import AddressItem from "@sections/address/AddressItem";

const AddressList = () => {
  const [addressList,  setAddressList] = useState<any>([]);
  
  useEffect(() => {
    getAddresList();
  }, [])

  const getAddresList = async() => {

    let addressList:any = await api.getAddressList();
    setAddressList(addressList);
  }

  return (
    <Fragment>
      <DashboardPageHeader
        title="My Addresses"
        iconName="pin_filled"
        button={<AddNewAddress />}
      />

      {addressList.map((item:any) => (
        <AddressItem item={item} />
      ))}

      <AddressPagination addressList={addressList} />
    </Fragment>
  );
};

export default AddressList;
