"use client";
import * as yup from "yup";
import Link from "next/link";
import Box from "@component/Box";
import { useFormik } from "formik";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import { useRouter } from "next/navigation";
import TextField from "@component/text-field";
import { FC, useCallback, useEffect, useState } from "react";
import { Button, IconButton } from "@component/buttons";
import { H3, H5, H6, SemiSpan, Small, Span } from "@component/Typography";
import { StyledSessionCard } from "./styles";
import App from "@models/firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { colors } from "@utils/themeColors";
import Authentication from "@helpers/Autentication";
import Image from "@component/Image";
import FirebaseService from "@services/FirebaseService";
import Client from "@models/Client.model";
import { useHash } from "@hook/useHash";

interface LoginProps {
  redirect?: any;
}

const Login: FC<LoginProps> = ({redirect}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const router = useRouter();
  const auth = getAuth(App); // Inicializa la autenticación de Firebase.
  const [message, setMessage] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [color, setColor] = useState("");

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values: { email: string; password: string }) => {
    try{
      let user:any = await FirebaseService.getUser(values.email);
      if(user.length == 0){
        setVisibility(true);
        setMessage("Las credenciales son incorrectas");
        setColor(colors.titan.salmon)
        setTimeout(() => {
          setVisibility(false);
          setMessage("");
        }, 3000);
        return false;
      }
      
      let request:any = await signInWithEmailAndPassword(auth, values.email, values.password);
      let data = JSON.stringify(request._tokenResponse);
      Authentication.setItem("dataUser", data);
      router.push(redirect);
    }catch(e){
      console.log(e)
      setVisibility(true);
      setMessage("Las credenciales son incorrectas");
      setColor(colors.titan.salmon)
      setTimeout(() => {
        setVisibility(false);
        setMessage("");
      }, 3000);
    }
  };
  
  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      let data:any = await signInWithPopup(auth, provider);
      console.log(data)
      // router.push("/perfil");
    } catch (error) {
      console.error(error);
      // Manejar errores aquí
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    let response:any = await signInWithPopup(auth, provider);
    let userFirebase:any = await FirebaseService.getUser(response.user.email);
    if (userFirebase.length == 0){
      let client = new Client(response.user.displayName, "","", response.user.email, "", "", "");
      FirebaseService.createUser(client);
    }
    let user:any = JSON.stringify(response._tokenResponse);
    Authentication.setItem("dataUser", user);
    router.push(redirect)
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    });

  return (
    <StyledSessionCard mx="auto" my="2rem" boxShadow="large" borderRadius={8}>
      <form className="content" onSubmit={handleSubmit}>
        { visibility &&
          <H5
            fontWeight="600"
            fontSize="12px"
            color={color}
            textAlign="center"
            mb=".5rem"
          >
            {message}
          </H5>
        }
        <FlexBox className="logo" alignItems="center" justifyContent="center">
          <Link href={"/"}>
            <Image src="/assets/images/logo.webp" alt="logo" />
          </Link>
        </FlexBox>
        <H3 textAlign="center" mb="0.5rem">
          Te damos la bienvenida a Titan Decko
        </H3>

        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Ingresar con email y contraseña
        </H5>

        <TextField
          fullwidth
          mb="0.75rem"
          name="email"
          type="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email || ""}
          placeholder="Correo electrónico"
          label="Email o celular"
          errorText={touched.email && errors.email}
        />

        <TextField
          mb="1rem"
          fullwidth
          name="password"
          label="Contraseña"
          autoComplete="on"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="*********"
          value={values.password || ""}
          errorText={touched.password && errors.password}
          type={passwordVisibility ? "text" : "password"}
          endAdornment={
            <IconButton
              p="0.25rem"
              mr="0.25rem"
              type="button"
              onClick={togglePasswordVisibility}
              color={passwordVisibility ? "gray.700" : "gray.600"}
            >
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
        />

        <Button
          mb="1.65rem"
          variant="contained"
          color="primary"
          type="submit"
          fullwidth
        >
          Login
        </Button>

        <Box mb="1rem">
          <Divider width="200px" mx="auto" />
          <FlexBox justifyContent="center" mt="-14px">
            <Span color="text.muted" bg="body.paper" px="1rem">
              on
            </Span>
          </FlexBox>
        </Box>

        <FlexBox
          onClick={handleFacebookLogin} // Aquí añades el evento onClick
          mb="0.75rem"
          height="40px"
          color="white"
          bg="#3B5998"
          borderRadius={5}
          cursor="pointer"
          alignItems="center"
          justifyContent="center"
        >
          <Icon variant="small" defaultcolor="auto" mr="0.5rem">
            facebook-filled-white
          </Icon>
          <Small fontWeight="600">Iniciar con Facebook</Small>
        </FlexBox>

        <FlexBox
          onClick={handleGoogleLogin} 
          mb="1.25rem"
          height="40px"
          color="white"
          bg="#4285F4"
          borderRadius={5}
          cursor="pointer"
          alignItems="center"
          justifyContent="center"
        >
          <Icon variant="small" defaultcolor="auto" mr="0.5rem">
            google-1
          </Icon>
          <Small fontWeight="600">Iniciar con Google</Small>
        </FlexBox>

        <FlexBox justifyContent="center" mb="1.25rem">
          <SemiSpan>Aun no tienes una cuenta?</SemiSpan>
          <Link href="/signup">
            <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
              Registarme
            </H6>
          </Link>
        </FlexBox>
      </form>

      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Olvidaste tu contraseña?</SemiSpan>
        <Link href="/">
          <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
            Recuperar contraseña
          </H6>
        </Link>
      </FlexBox>
    </StyledSessionCard>
  );
};

const initialValues = { email: "", password: "" };

const formSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("${path} is required"),
  password: yup.string().required("${path} is required"),
});

export default Login;
