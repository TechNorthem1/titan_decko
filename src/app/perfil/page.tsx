"use client"
import { Fragment, useEffect, useState } from "react";
import Box from "@component/Box";
import { format } from "date-fns";
import Card from "@component/Card";
import Avatar from "@component/avatar";
import User from "@utils/__api__/user"
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import Typography, { H3, H5, Small } from "@component/Typography";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import EditProfileButton from "@component/profile/EditProfileButton";
import { useRouter } from "next/navigation";
import { colors } from "@utils/themeColors";

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
    let data:any = User.getUser("dataUser");
    if (data === null){
      router.push("/");
    }else{
      setUser(data);
    }
  }, [])


  useEffect(() => {}, [user])
  
  return (
    <Fragment>
      {user !== undefined &&
        <DashboardPageHeader
          iconName="user_filled"
          title={user.email.stringValue}
          button={<EditProfileButton />}
        />
      }

      <Box mb="30px">
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FlexBox
              as={Card}
              p="14px 32px"
              height="100%"
              borderRadius={8}
              alignItems="center"
            >
              {/* <Avatar src={user.avatar} size={64} /> */}

              <Box ml="12px" flex="1 1 0">
                <FlexBox
                  flexWrap="wrap"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div>
                    {user && <H5 my="0px">{`${user.name.stringValue} ${user.lastname.stringValue}`}</H5>}

                    <FlexBox alignItems="center">
                      <Typography fontSize="14px" color="text.hint">
                        Balance:
                      </Typography>

                      <Typography ml="4px" fontSize="14px" color="primary.main">
                        $500
                      </Typography>
                    </FlexBox>
                  </div>

                  <Typography
                    ontSize="14px"
                    color="text.hint"
                    letterSpacing="0.2em"
                  >
                    SILVER USER
                  </Typography>
                </FlexBox>
              </Box>
            </FlexBox>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid container spacing={4}>
              {infoList.map((item) => (
                <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
                  <FlexBox
                    as={Card}
                    height="100%"
                    p="1rem 1.25rem"
                    borderRadius={8}
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <H3 color="primary.main" my="0px" fontWeight="600">
                      {item.title}
                    </H3>

                    <Small color="text.muted" textAlign="center">
                      {item.subtitle}
                    </Small>
                  </FlexBox>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <TableRow p="0.75rem 1.5rem">
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color={`${colors.titan.salmon}`} mb="4px" textAlign="left">
            First Name
          </Small>

          {user && <span style={{color:colors.titan.dark}}>{user.name.stringValue}</span>}
        </FlexBox>

        <FlexBox flexDirection="column" p="0.5rem">
          <Small color={`${colors.titan.salmon}`} mb="4px" textAlign="left">
            Last Name
          </Small>

          {user && <span style={{color:colors.titan.dark}}>{user.lastname.stringValue}</span>}
        </FlexBox>

        <FlexBox flexDirection="column" p="0.5rem">
          <Small color={`${colors.titan.salmon}`} mb="4px" textAlign="left">
            Email
          </Small>

          { user &&<span style={{color:colors.titan.dark}}>{user.email.stringValue}</span>}
        </FlexBox>

        <FlexBox flexDirection="column" p="0.5rem">
          <Small color={`${colors.titan.salmon}`} mb="4px" textAlign="left">
            Phone
          </Small>

          {user && <span style={{color:colors.titan.dark}}>{user.phone.stringValue}</span>}
        </FlexBox>

        <FlexBox flexDirection="column" p="0.5rem">
          <Small color={`${colors.titan.salmon}`} mb="4px">
            Direccion
          </Small>

          {user && <span style={{color:colors.titan.dark}}>{user.address.stringValue}</span>}
        </FlexBox>
      </TableRow>
    </Fragment>
  );
};

export default Profile;
