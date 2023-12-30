"use client"
import {  useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Tiny } from "@component/Typography";
import { IconButton } from "@component/buttons";
import { SearchInputWithCategory } from "@component/search-box";
import { useAppContext } from "@context/AppContext";
import Link from "next/link"
import Box from "@component/Box";
import Image from "@component/Image";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import MiniCart from "@component/mini-cart";
import Container from "@component/Container";
import Sidenav from "@component/sidenav/Sidenav";
import StyledHeader from "./styles";
import Navbar from "@component/navbar/Navbar";
import CategoriesApi from "@utils/__api__/categories"
import Authentication from "@helpers/Autentication";
import Helpers from "@helpers/Helpers";
import FirebaseService from "@services/FirebaseService";



// ====================================================================

type HeaderProps = { isFixed?: boolean; className?: string, isResponsive?: boolean, isAuthenticated?: boolean, setIsAuthenticated?: Function ;};
// =====================================================================

const Header: FC<HeaderProps> = ({ isFixed, className, isAuthenticated, setIsAuthenticated, isResponsive }) => {
  const { state } = useAppContext();
  const [open, setOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);
  const [viewElementHeader, setViewElementHeader] = useState(true);
  const [categories, setCategories] = useState<any>([]);
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
    getCart();
    let routePrivate = Helpers.routesPrivates("dataUser");
    if (routePrivate){
      router.push("/");
    }
  }, [])

  // Separate effect to log categories when it updates
  useEffect(() => {}, [categories]);
  useEffect(() => {}, [isAuthenticated, state]);

  const getCart = () => {
    let cart = Authentication.getItem("cart") == null ? [] : Authentication.getItem("cart");
    state.cart = cart;
  }

  const sendLocalStorage = () => {
    let cart = state.cart;
    Authentication.setItem("cart", cart);
  }

  // obtain data of the localstorage
  const getDataUser = ()=> {
    let authenticated = Helpers.isAuthenticated("dataUser");
    setIsAuthenticated(authenticated);
  }

  const close = () => {
    FirebaseService.logout();
    Authentication.removeItem();
    setIsAuthenticated(true);
    router.push("/");
  }

                                                                                                                                      
  const CART_HANDLE = (
    <Box ml="20px" position="relative">
      <IconButton bg="gray.black" p="12px" size="small">
        <Icon size="20px">bag</Icon>
      </IconButton>
      
      {!!state?.cart?.length && (
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
      <Icon size="28px">arrow-right-to-bracket-solid2</Icon>
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
        <FlexBox className="logo" alignItems="center" mr="1rem" style={{display:"block"}}>
          <Link href="/" onClick={sendLocalStorage}>
            <Image src="/assets/images/logo.webp" alt="logo" width={200} height={74} style={{objectFit: "cover"}} loading="lazy"/>
          </Link>
        </FlexBox>
          <FlexBox justifyContent="center" flex="1 1 0">
            {viewElementHeader &&  
              <SearchInputWithCategory isResposive={isResponsive}/>
            }
          </FlexBox>

          <FlexBox className="header-right" alignItems="center">
            {viewElementHeader && isAuthenticated &&
              <Link href="/login" onClick={sendLocalStorage}>{LOGIN_HANDLE}</Link>
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
              <Link href="/" onClick={sendLocalStorage}>Seguir Comprando</Link>
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
      {viewElementHeader && 
        <Navbar categories={categories} isAuthenticated={!isAuthenticated} />
      }

    </StyledHeader>
  );
};

export default Header;
