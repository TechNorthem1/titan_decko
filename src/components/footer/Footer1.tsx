"use client";
import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import Box from "@component/Box";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import AppStore from "@component/AppStore";
import Container from "@component/Container";
import Typography, { Paragraph } from "@component/Typography";
import { getTheme } from "@utils/utils";

// styled component
const StyledLink = styled(Link)`
  position: relative;
  display: block;
  padding: 0.3rem 0rem;
  color: ${getTheme("colors.gray.500")};
  cursor: pointer;
  border-radius: 4px;
  :hover {
    color: ${getTheme("colors.gray.100")};
  }
`;

const Footer1: FC = () => {
  return (
    <footer>
      <Box bg="#000000">
        <Container p="1rem" color="white">
          <Box py="5rem" overflow="hidden">
            <Grid container spacing={6}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/">
                  <Image
                    alt="logo"
                    mb="1.25rem"
                    src="/assets/images/logo.webp"
                  />
                </Link>

                <Paragraph mb="1.25rem" color="gray.500">
                  
                </Paragraph>
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize="25px"
                  fontWeight="600"
                >
                  Nosotros
                </Typography>

                <div>
                  {aboutLinks.map((item, ind) => (
                    
                    <StyledLink href={`market-2/${item}`} key={ind}>
                      {item}
                    </StyledLink>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize="25px"
                  fontWeight="600"
                >
                  Atención al cliente
                </Typography>

                <div>
                  {customerCareLinks.map((item, ind) => (
                    <StyledLink href="/" key={ind}>
                      {item}
                    </StyledLink>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize="25px"
                  fontWeight="600"
                >
                  Contactanos
                </Typography>

                <Typography py="0.3rem" color="gray.500">
                  Bogota D.C
                </Typography>

                <Typography py="0.3rem" mb="1rem" color="gray.500">
                  Telefono: +57 3203764679
                </Typography>

                <FlexBox className="flex" mx="-5px">
                  {iconList.map((item) => (
                    <a
                      href={item.url}
                      target="_blank"
                      key={item.iconName}
                      rel="noreferrer noopenner"
                    >
                      <Box
                        m="5px"
                        p="10px"
                        size="small"
                        borderRadius="50%"
                        bg="rgba(0,0,0,0.2)"
                      >
                        <Icon size="12px" defaultcolor="auto">
                          {item.iconName}
                        </Icon>
                      </Box>
                    </a>
                  ))}
                </FlexBox>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

const aboutLinks = [
  "Jobs",
  "Nuestra historia",
  "Terminos y condiciones",
  "Politica de privacidad",
];

const customerCareLinks = [
  "Ayuda",
  "Como comprar",
  "Seguir mi orden",
  "Compras corporativas B2B",
  "Devoluciones",
  "Terminos y condiciones",
];

const iconList = [
  { iconName: "facebook", url: "https://www.facebook.com/TitanDeckoColombia/" },
  { iconName: "twitter", url: "/" },
  {
    iconName: "youtube",
    url: "https://www.youtube.com/@titandecko/videos",
  },
  { iconName: "google", url: "/" },
  { iconName: "instagram", url: "https://www.instagram.com/titandecko.com.co/" },
];

export default Footer1;
