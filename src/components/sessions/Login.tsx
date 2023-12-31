"use client";
import { Button, IconButton } from 


"@component/buttons";
import { FC, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@component/Box";
import TextField from "@component/text-field";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
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
import NavLink from "@component/nav-link";
import { useAppContext } from "@context/AppContext";

interface LoginProps {
  redirect?: any;
  displayCss?:string;
}

const Login: FC<LoginProps> = ({redirect, displayCss = "flex"}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const router = useRouter();
  const auth = getAuth(App); // Inicializa la autenticación de Firebase.
  const [message, setMessage] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [color, setColor] = useState("");
  const {state, dispatch} = useAppContext();
  

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
      let data = request._tokenResponse;
      let cart = state.cart;
      Authentication.setItem("dataUser", data);
      Authentication.setItem("cart", cart);
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
      router.replace(redirect);
    } catch (error) {
      error;
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
    let user:any = response._tokenResponse;
    let cart = state.cart;
    Authentication.setItem("dataUser", user);
    Authentication.setItem("cart", cart);
    router.push(redirect);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    });

  const closeForm = () => {
    let modal_root = document.querySelector("#modal-root");
    let close_form = modal_root.querySelector(".Box-sc-cded154d-0.FlexBox-sc-f2642c76-0.Modal__StyledModal-sc-a82a3802-0.gIudMd.cKBNvI.iftNTa") ||  modal_root.querySelector(".sc-cded154d-0.sc-f2642c76-0.sc-a82a3802-0.bnvrZN.dTsPKy.eOZEQc") || modal_root.querySelector(".sc-70ffb4e0-0.sc-df2fee75-0.sc-4ce65b65-0.LILpj.cfNivg.hynrff");
    if (close_form instanceof HTMLElement) {
      close_form.style.visibility = "hidden";
      close_form.style.opacity = "0";
      close_form.style.backgroundColor = "transparent";
    }else{
      console.log("no se ha encontrado el elemento")
    }
  }



  return (
    <StyledSessionCard mx="auto" my="2rem" boxShadow="large" borderRadius={8}>
      <div className="form_close" style={{width: "100%", height: "30px", display: displayCss, cursor: "pointer", alignItems: "center", justifyContent: "flex-end", paddingRight: "10px"}} >
        <Icon variant="small" style={{color: colors.titan.white}} onClick={closeForm}>
          circle-xmark-regular
        </Icon>
      </div>

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
          <NavLink href={"/"}>
            <Image src="/assets/images/logo.webp" alt="logo" />
          </NavLink>
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
          <NavLink href="/signup">
            <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
              Registarme
            </H6>
          </NavLink>
        </FlexBox>
      </form>

      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Olvidaste tu contraseña?</SemiSpan>
        <NavLink href="/">
          <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
            Recuperar contraseña
          </H6>
        </NavLink>
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
