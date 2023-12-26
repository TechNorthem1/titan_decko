"use client"
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { Chip } from "@component/Chip";
import Icon from "@component/icon/Icon";
import NavLink from "@component/nav-link";
import { useAppContext } from "@context/AppContext";
import useWindowSize from "@hook/useWindowSize";
import { layoutConstant } from "@utils/constants";
import { getTheme } from "@utils/utils";
import { Button } from "@component/buttons";
import Helpers from "@helpers/Helpers";
import FirebaseService from "@services/FirebaseService";
import Authentication from "@helpers/Autentication";
import { useRouter } from "next/navigation";

// styled component
const Wrapper = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  position: fixed;
  justify-content: space-around;
  height: ${layoutConstant.mobileNavHeight};
  background: ${getTheme("colors.body.paper")};
  box-shadow: 0px 1px 4px 3px rgba(0, 0, 0, 0.1);
  z-index: 999;

  .link {
    flex: 1 1 0;
    display: flex;
    font-size: 13px;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    .icon {
      display: flex;
      margin-bottom: 4px;
      align-items: center;
      justify-content: center;
    }
  }

  @media only screen and (max-width: 900px) {
    display: flex;
    width: 100vw;
    align-items: center !important;
  }
`;

interface MobileNavigationBarProps {isAuthenticated?: boolean, setIsAuthenticated?: Dispatch<SetStateAction<boolean>> }

const MobileNavigationBar: FC<MobileNavigationBarProps> = ({isAuthenticated, setIsAuthenticated}) => {
  const width: any = useWindowSize();
  const { state } = useAppContext();
  const router = useRouter();

  useEffect(() => {
   getData();
  }, [])
  
  const getData = () => {
    let authenticated = Helpers.isAuthenticated("dataUser");
    setIsAuthenticated(authenticated)
  }
 

  const closed = () => {
    FirebaseService.logout();
    let dataUser = Authentication.encriptKey("dataUser");
    localStorage.removeItem(dataUser);
    router.push("/")
    setIsAuthenticated(true)
  }

  return (
    width <= 900 && (
      <Wrapper>
        
        <NavLink className="link" href={"/"}>
          <Icon className="icon" variant="small">
            home
          </Icon>

          Inicio
        </NavLink>

        <NavLink className="link" href={"/carrito"}>
          <Icon className="icon" variant="small">
            bag
          </Icon>

          Carrito

          
          <Chip
            top="4px"
            px="0.25rem"
            fontWeight="600"
            bg="primary.main"
            position="absolute"
            color="primary.text"
            left="calc(50% + 8px)"
          >
            {state.cart.length}
          </Chip>
        </NavLink>

        {isAuthenticated && <NavLink className="link" href={"/login"}>
          <Icon className="icon" variant="small">
            user-2
          </Icon>
          Login
        </NavLink>}

        {!isAuthenticated && <NavLink className="link" href={"/perfil"}>
          <Icon className="icon" variant="small">
            user-2
          </Icon>
          Cuenta
        </NavLink>}

        {!isAuthenticated && <Button onClick={closed} style={{display: "flex", flexDirection: "column", alignItems: "center", height: "43px", width: "43px"}}>
          <Icon className="icon" variant="small">
            arrow-right-to-bracket-solid
          </Icon>
          Salir
        </Button>}
      </Wrapper>
    )
  );
};


export default MobileNavigationBar;
