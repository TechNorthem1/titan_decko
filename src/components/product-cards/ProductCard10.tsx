"use client";
import Link from "next/link";
import NextImage from "next/legacy/image";
import styled from "styled-components";
import Box from "../Box";
import Card from "../Card";
import { Chip } from "../Chip";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import { Button } from "../buttons";
import { H3, SemiSpan } from "../Typography";
import { deviceSize } from "@utils/constants";
import { useAppContext } from "@context/AppContext";
import ProductQuickView from "@component/products/ProductQuickView";
import { calculateDiscount, currency, getTheme } from "@utils/utils";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { colors } from "@utils/themeColors";
import { disconnect } from "process";

// styled component
const Wrapper = styled(Card)`
  margin: auto;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  transition: all 250ms ease-in-out;

  &:hover {
    .details {
      .add-cart {
        display: flex;
      }
    }
    .image-holder {
      .extra-icons {
        display: block;
      }
    }
  }

  .image-holder {
    text-align: center;
    position: relative;
    display: inlin-block;

    .extra-icons {
      z-index: 2;
      top: 0.75rem;
      display: none;
      right: 0.75rem;
      cursor: pointer;
      position: absolute;
    }

    @media only screen and (max-width: ${deviceSize.sm}px) {
      display: block;
    }
  }

  .details {
    padding: 1rem;

    .title,
    .categories {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .icon-holder {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      justify-content: space-between;
    }

    .favorite-icon {
      cursor: pointer;
    }
    .outlined-icon {
      svg path {
        fill: ${getTheme("colors.text.hint")};
      }
    }
    .add-cart {
      display: none;
      margin-top: auto;
      align-items: center;
      flex-direction: column;
    }
  }

  @media only screen and (max-width: 768px) {
    .details {
      .add-cart {
        display: flex;
      }
    }
  }
`;

// ======================================================================
type ProductCard10Props = {
  off: number;
  slug: string;
  unit: string;
  title: string;
  price: number;
  imgUrl: string;
  rating: number;
  images: string[];
  id: string | number;
  salePrice?: number;
};
// ======================================================================

const ProductCard10: FC<ProductCard10Props> = (props) => {
  const { id, off, unit, slug, title, price, imgUrl, images, salePrice} = props;

  const [open, setOpen] = useState(false);
  const [discountPrice, setDiscountPrice] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<string>("");

  useEffect(() => {
    setDiscountPrice(() => calculateDiscount(price, off));
    setDiscountAmount(() => currency(off));
  }, []);

  const { state, dispatch } = useAppContext();
  const cartItem = state.cart.find((item) => item.id === id);

  const toggleDialog = useCallback(() => setOpen((open) => !open), []);

  const handleCartAmountChange = (qty: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { price, imgUrl, id, qty, slug, name: title },
    });
  };


  return (
    <Wrapper borderRadius={8}>
      <div className="image-holder">
        {off >= 0 && (
          <Chip
            top="10px"
            left="10px"
            p="5px 10px"
            fontSize="10px"
            fontWeight="600"
            bg={colors.titan.salmon}
            position="absolute"
            color={colors.titan.white}
            zIndex={1000}
          >
            {off}% Descuento
          </Chip>
        )}

        <FlexBox className="extra-icons">
          <Icon
            style={{"color":colors.titan.salmon}}
            variant="small"
            mb="0.5rem"
            onClick={toggleDialog}
          >
            eye-alt
          </Icon>

          <Icon 
            className="favorite-icon outlined-icon" 
            variant="small"
            style={{"color": colors.titan.salmon}}
          >
            heart
          </Icon>
        </FlexBox>

        <Link href={`/producto/${title}/${id}`}>
          <NextImage
            src={imgUrl}
            width={100}
            height={100}
            layout="responsive"
            alt={title}
            priority
          />
        </Link>
      </div>

      <div className="details" style={{"backgroundColor": colors.titan.bg, "border": `1px solid ${colors.titan.gray}`}}>
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
            <Link href={`/producto/${title}/${id}`}>
              <H3
                mb="6px"
                title={title}
                fontSize="14px"
                textAlign="left"
                fontWeight="600"
                className="title"
                color={colors.titan.dark}
                style={{textTransform: "capitalize"}}
              >
                {title}
              </H3>
            </Link>

            <SemiSpan style={{"color": colors.titan.dark}}>Cantidad: {unit || "300ml"}</SemiSpan>

            <FlexBox alignItems="center" mt="6px">
              <SemiSpan pr="0.5rem" fontWeight="600" style={{"color": colors.titan.dark}}>
                {discountPrice}
              </SemiSpan>

              {off && (
                <SemiSpan style={{"color": colors.primary.dark}} fontWeight="600">
                  <del>$ {price}</del>
                </SemiSpan>
              )}
            </FlexBox>
          </Box>

          <FlexBox
            width="30px"
            alignItems="center"
            flexDirection="column-reverse"
            justifyContent={!!cartItem ? "space-between" : "flex-start"}
          >
            <Button
              size="none"
              padding="5px"
              color="primary"
              variant="outlined"
              borderColor="primary.salmon"
              onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}
            >
              <Icon variant="small">plus</Icon>
            </Button>

            {cartItem?.qty && (
              <Fragment>
                <SemiSpan style={{"color": colors.titan.dark}} fontWeight="600">
                  {cartItem.qty}
                </SemiSpan>

                <Button
                  size="none"
                  padding="5px"
                  color="primary"
                  variant="outlined"
                  borderColor="primary.light"
                  onClick={handleCartAmountChange(cartItem.qty - 1)}
                >
                  <Icon variant="small">minus</Icon>
                </Button>
              </Fragment>
            )}
          </FlexBox>
        </FlexBox>
      </div>

      <ProductQuickView
        open={open}
        onClose={toggleDialog}
        product={{ id, images, slug, price, title }}
        salePrice={salePrice}
      />
    </Wrapper>
  );
};

export default ProductCard10;
