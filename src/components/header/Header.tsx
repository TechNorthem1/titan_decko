"use client";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Box from "@component/Box";
import Image from "@component/Image";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import MiniCart from "@component/mini-cart";
import Container from "@component/Container";
import { Tiny } from "@component/Typography";
import { IconButton } from "@component/buttons";
import Sidenav from "@component/sidenav/Sidenav";
import { SearchInputWithCategory } from "@component/search-box";
import { useAppContext } from "@context/AppContext";
import StyledHeader from "./styles";
import Navbar from "@component/navbar/Navbar";import Method from "@helpers/Method";
import CategoriesApi from "@utils/__api__/categories"
import Authentication from "@helpers/Autentication";
import {  useRouter } from "next/navigation";
import Helpers from "@helpers/Helpers";
import FirebaseService from "@services/FirebaseService";



// ====================================================================
type HeaderProps = { isFixed?: boolean; className?: string };
// =====================================================================

const Header: FC<HeaderProps> = ({ isFixed, className }) => {
  const { state } = useAppContext();
  const [open, setOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);
  const [viewElementHeader, setViewElementHeader] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  

  useEffect(()=> {
    let url = window.location.href;
    let url_comprar_ahora = url.includes("comprar-ahora");
    let url_cart = url.includes("carrito");
    
    if(url_comprar_ahora || url_cart){
      setViewElementHeader(false)
    }

    const fetchCategories = async () => {
      try {
        const data = await CategoriesApi.getCategoriesSpecific("products/categories/?include=72,163,87,128,173,97,121,78,131,127&per_page=11&orderby=id&order=desc");
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
    getDataUser();
    let routePrivate = Helpers.routesPrivates();
    if (routePrivate){
      router.push("/");
    }
  }, [])


  // Separate effect to log categories when it updates
  useEffect(() => {}, [categories]);
  useEffect(() => {}, [isAuthenticated]);

  // obtain data of the localstorage
  const getDataUser = ()=> {
    let authenticated = Helpers.isAuthenticated("dataUser");
    setIsAuthenticated(authenticated);
  }

  const close = () => {
    FirebaseService.logout();
    let keyUser:string = Authentication.encriptKey("dataUser");
    let keyToken:string = Authentication.encriptKey("token_user");
    localStorage.removeItem(keyUser);
    localStorage.removeItem(keyToken);
    setIsAuthenticated(true);
    router.push("/");
  }

                                                                                                                                      
  const CART_HANDLE = (
    <Box ml="20px" position="relative">
      <IconButton bg="gray.black" p="12px" size="small">
        <Icon size="20px">bag</Icon>
      </IconButton>

      {!!state.cart.length && (
        <FlexBox
          top={-5}
          right={-5}
          height={20}
          minWidth={20}
          bg="primary.main"
          borderRadius="50%"
          alignItems="center"
          position="absolute"
          justifyContent="center"
        >
          <Tiny color="white" fontWeight="600" lineHeight={1}>
            {state.cart.length}
          </Tiny>
        </FlexBox>
      )}
    </Box>
  );

  const LOGIN_HANDLE = (
    <IconButton ml="1rem" bg="gray.black" p="8px">
      <Icon size="28px">user</Icon>
    </IconButton>
  );

  const LOGOUT_HANDLE = ( 
    <IconButton ml="1rem" bg="gray.black" p="8px">
      <Icon size="28px">closed</Icon>
    </IconButton>
  );


  return (
    <StyledHeader className={className}>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        <FlexBox className="logo" alignItems="center" mr="1rem">
          <Link href={"/"}>
            <Image src="/assets/images/logo.webp" alt="logo" />
          </Link>
        </FlexBox>
          <FlexBox justifyContent="center" flex="1 1 0">
            {viewElementHeader &&  
              <SearchInputWithCategory />
            }
          </FlexBox>

          <FlexBox className="header-right" alignItems="center">
            {viewElementHeader && isAuthenticated &&
              <Link href={"/login"}>{LOGIN_HANDLE}</Link>
            }

            {viewElementHeader && 
              <Sidenav
                open={open}
                width={380}
                position="right"
                handle={CART_HANDLE}
                toggleSidenav={toggleSidenav}
              >
                <MiniCart toggleSidenav={toggleSidenav} />
              </Sidenav>
            }

            {!viewElementHeader && 
              <Link href={"/"} >Seguir Comprando</Link>
            }


            {!isAuthenticated && 

              <Sidenav
                width={380}
                handle={LOGOUT_HANDLE}
                toggleSidenav={close}
              >
              </Sidenav>
            }
          </FlexBox>
      </Container>
      {viewElementHeader && <Navbar categories={categories} isAuthenticated={!isAuthenticated}/>
        }
    </StyledHeader>
  );
};

export default Header;
