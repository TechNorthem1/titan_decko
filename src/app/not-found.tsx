"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "@component/Image";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import {colors } from "@utils/themeColors";

const NotFound = () => {
  const router = useRouter();
  const handleGoBack = () => router.back();

  return (
    <FlexBox
      px="1rem"
      minHeight="100vh"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      backgroundColor={colors.titan.bg}
    >
      <Image
        src="/assets/images/illustrations/404.svg"
        maxWidth="320px"
        width="100%"
        mb="2rem"
      />

      <FlexBox flexWrap="wrap">
        <Button
          variant="outlined"
          m="0.5rem"
          onClick={handleGoBack}
          style={{color: colors.titan.white, backgroundColor: colors.titan.dark, borderColor: "transparent"}}
        >
          Regresar
        </Button>

        <Link href="/">
          <Button variant="contained" color="primary" m="0.5rem" style={{backgroundColor: colors.titan.dark}}>
            Ir al inicio
          </Button>
        </Link>
      </FlexBox>
    </FlexBox>
  );
};

export default NotFound;
