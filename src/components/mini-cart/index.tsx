"use client"
import { FC, Fragment, useEffect } from "react";
import Link from "next/link"
import NextImage from "next/legacy/image";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Avatar from "@component/avatar";
import { Button, IconButton } from "@component/buttons";
import Typography, { H5, Paragraph, Tiny } from "@component/Typography";
import { useAppContext } from "@context/AppContext";
import { StyledMiniCart } from "./styles";
import { currency } from "@utils/utils";
import Helper from "@helpers/Helpers";
import UserLoginDialog from "@component/header/LoginDialog";
import Login from "@component/sessions/Login";
import { colors } from "@utils/themeColors";
import Authentication from "@helpers/Autentication";


type MiniCartProps = { toggleSidenav?: () => void };
const MiniCart: FC<MiniCartProps> = ({ toggleSidenav = () => {} }) => {
  const { state, dispatch } = useAppContext();
  const isAuthenticated = Helper.isAuthenticated("dataUser");

  useEffect(() => {getCart()}, [])

  const handleCartAmountChange = (amount: number, product: any) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product, qty: amount },
    });
  };

  const getCart = () => {
    let cart = JSON.parse(Authentication.getItem("cart"));
    console.log(cart)
    state.cart = cart;
  }

  const getTotalPrice = () => {
    return (
      state.cart.reduce(
        (accumulator, item) => accumulator + item.price * item.qty,
        0
      ) || 0
    );
  };

  const LOGIN_HANDLE = (
    <Button ml="1rem" bg="gray.black" p="8px" style={{width:"50%", backgroundColor:colors.titan.yellow, color: colors.titan.dark, marginBottom: "10px"}}>
      Comprar Ahora
    </Button>
  );

  const sendLocalStorage = () => {
    let cart = JSON.stringify(state.cart);
    Authentication.setItem("cart", cart);
  }

  return (
    <StyledMiniCart>
      <div className="cart-list">
        <FlexBox alignItems="center" m="0px 20px" height="74px">
          <Icon size="1.75rem">bag</Icon>
          <Typography fontWeight={600} fontSize="16px" ml="0.5rem">
            {state.cart.length} Productos
          </Typography>
        </FlexBox>

        <Divider />

        {!!!state.cart.length && (
          <FlexBox
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            height="calc(100% - 80px)"
          >
            <NextImage
              src="/assets/images/logos/shopping-bag.svg"
              width={90}
              height={90}
              alt="bonik"
            />
            <Paragraph
              mt="1rem"
              color="text.muted"
              textAlign="center"
              maxWidth="200px"
            >
              Tu bolsa de compras está vacía. Empieza a comprar
            </Paragraph>
          </FlexBox>
        )}

        {state.cart.map((item) => (
          <Fragment key={item.id}>
            <div className="cart-item">
              <FlexBox alignItems="center" flexDirection="column">
                <Button
                  variant="outlined"
                  color="primary"
                  padding="5px"
                  size="none"
                  borderColor="primary.light"
                  borderRadius="300px"
                  onClick={handleCartAmountChange(item.qty + 1, item)}
                >
                  <Icon variant="small">plus</Icon>
                </Button>

                <Typography fontWeight={600} fontSize="15px" my="3px">
                  {item.qty}
                </Typography>

                <Button
                  size="none"
                  padding="5px"
                  color="primary"
                  variant="outlined"
                  borderRadius="300px"
                  borderColor="primary.light"
                  onClick={handleCartAmountChange(item.qty - 1, item)}
                  disabled={item.qty === 1}
                >
                  <Icon variant="small">minus</Icon>
                </Button>
              </FlexBox>

              <Link href={`/product/${item.slug}`}>
                <Avatar
                  size={76}
                  mx="1rem"
                  alt={item.name}
                  src={item.imgUrl || "/assets/images/products/iphone-x.png"}
                />
              </Link>

              <div className="product-details">
                <Link href={`/product/${item.id}`}>
                  <H5 className="title" fontSize="14px">
                    {item.name}
                  </H5>
                </Link>

                <Tiny color="text.muted">
                  {currency(item.price, 0)} x {item.qty}
                </Tiny>

                <Typography
                  fontWeight={600}
                  fontSize="14px"
                  color="primary.main"
                  mt="4px"
                >
                  {currency(item.qty * item.price)}
                </Typography>
              </div>

              <Icon
                size="1rem"
                ml="1.25rem"
                className="clear-icon"
                onClick={handleCartAmountChange(0, item)}
              >
                Eliminar
              </Icon>
            </div>
            <Divider />
          </Fragment>
        ))}
      </div>

      {!!state.cart.length && (
        <Fragment>
          {!isAuthenticated &&
            <Link href="/comprar-ahora" onClick={sendLocalStorage}>
              <Button
                color="primary"
                variant="contained"
                m="1rem 1rem 0.75rem"
                onClick={toggleSidenav}
              >
                
                <Typography fontWeight={600}>
                  Pagar ({currency(getTotalPrice())})
                </Typography>
              </Button>
            </Link>
          }

          {isAuthenticated &&
              <UserLoginDialog handle={LOGIN_HANDLE}>
               <div>
                 <Login  redirect="/comprar-ahora"/>
               </div>
             </UserLoginDialog>
             
          }


          <Link href="/carrito" onClick={sendLocalStorage} replace>
            <Button
              color="primary"
              variant="outlined"
              m="0px 1rem 0.75rem"
              onClick={toggleSidenav}
            >
              <Typography fontWeight={600}>Ver Carrito</Typography>
            </Button>
          </Link>
        </Fragment>
      )}
    </StyledMiniCart>
    
  );
};

export default MiniCart;
