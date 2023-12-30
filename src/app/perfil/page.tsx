"use client"
import { Fragment, useEffect, useState } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import User from "@utils/__api__/user"
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import Typography, { H3, H5, Small } from "@component/Typography";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import EditProfileButton from "@component/profile/EditProfileButton";
import { useRouter } from "next/navigation";
import { colors } from "@utils/themeColors";
import FirebaseService from "@services/FirebaseService";
import Authentication from "@helpers/Autentication";
import { useHash } from "@hook/useHash";

const Profile = () => {
  const [user, setUser] = useState<any>();
  const router = useRouter();
  const infoList = [
    { title: "16", subtitle: "All Orders" },
    { title: "02", subtitle: "Awaiting Payments" },
    { title: "00", subtitle: "Awaiting Shipment" },
    { title: "01", subtitle: "Awaiting Delivery" },
  ];

  useEffect(()=> {
    loadUser();
  }, [])

  const loadUser = async () => {
    let data = Authentication.getItem("dataUser");
    let user:any = await FirebaseService.getUser(data?.email);
    if (data === null){
      router.push("/");
    }else{
      setUser(user[0]?._document.data.value.mapValue.fields);
    }
  }


  useEffect(() => {}, [user])
  
  const INITIAL_VALUES = {
    name: user?.lastname?.stringValue.length === 0 ? "" : user?.name?.stringValue,
    lastname: user?.lastname?.stringValue.length === 0 ? "" : user?.lastname?.stringValue,
    email: user?.lastname?.stringValue.length === 0 ? "" : user?.email?.stringValue,
    phone: user?.lastname?.stringValue.length === 0 ? "" : user?.phone?.stringValue,
    address: user?.lastname?.stringValue.length === 0 ? "" : user?.address?.stringValue
  }

  return (
    <Fragment>
      {user !== undefined &&
        <DashboardPageHeader
          iconName="user_filled"
          title={INITIAL_VALUES.email}
          button={<EditProfileButton />}
        />
      }

      

      <TableRow p="0.75rem 1.5rem">
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color={`${colors.titan.salmon}`} mb="4px" textAlign="left">
            Nombres
          </Small>

          {user && <span style={{color:colors.titan.dark}}>{INITIAL_VALUES.name}</span>}
        </FlexBox>

        <FlexBox flexDirection="column" p="0.5rem">
          <Small color={`${colors.titan.salmon}`} mb="4px" textAlign="left">
            Apellidos
          </Small>

          {user && <span style={{color:colors.titan.dark}}>{INITIAL_VALUES.lastname}</span>}
        </FlexBox>

        <FlexBox flexDirection="column" p="0.5rem">
          <Small color={`${colors.titan.salmon}`} mb="4px" textAlign="left">
            Correo
          </Small>

          { user &&<span style={{color:colors.titan.dark}}>{INITIAL_VALUES.email}</span>}
        </FlexBox>

        <FlexBox flexDirection="column" p="0.5rem">
          <Small color={`${colors.titan.salmon}`} mb="4px" textAlign="left">
            Telefono
          </Small>

          {user && <span style={{color:colors.titan.dark}}>{INITIAL_VALUES.phone}</span>}
        </FlexBox>

        <FlexBox flexDirection="column" p="0.5rem">
          <Small color={`${colors.titan.salmon}`} mb="4px">
            Direccion
          </Small>

          {user && <span style={{color:colors.titan.dark}}>{INITIAL_VALUES.address}</span>}
        </FlexBox>
      </TableRow>
    </Fragment>
  );
};

export default Profile;
