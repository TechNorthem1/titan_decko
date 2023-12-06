"use client";
import Box from "../Box";
import * as yup from "yup";
import Link from "next/link";
import Icon from "../icon/Icon";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import CheckBox from "../CheckBox";
import { useFormik } from "formik";
import { FC, useState } from "react";
import TextField from "../text-field";
import { Button, IconButton } from "../buttons";
import { H3, H5, H6, SemiSpan, Small, Span } from "../Typography";
import { StyledSessionCard } from "./styles";
import App from "@models/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import {colors} from "@utils/themeColors"


const Signup: FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const auth = getAuth(App); // Inicializa la autenticación de Firebase.
  const [message, setMessage] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [color, setColor] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisibility((visible) => !visible);
  };

  const handleFormSubmit = async (values: any) => {
    console.log(values);
  };

  const handleEmailPasswordSignup = async (email:string, password:string) => {
    await createUserWithEmailAndPassword(auth, email, password)
    .then((item:any) => {
      const user = item.user.reloadUserInfo
      // console.log(`email: ${user.email}, passowrd: ${user.passwordHash}`)
      setMessage("El Usuario ha sido registrado correctamente");
      setVisibility(true);
      setColor(colors.titan.success)
      setTimeout(() => {
        setMessage("");
        setVisibility(false);
      }, 3000);
    })
    .catch((error:any) => {
      setMessage("El Usuario ya se encuntra registrado");
      setVisibility(true);
      setColor(colors.titan.salmon)
      setTimeout(() => {
        setMessage("");
        setVisibility(false);
      }, 3000);
    });
  };
  
  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Puedes obtener la información del usuario de result.user
    } catch (error) {
      // Manejo de errores
    }
  };
  
  const handleFacebookSignup = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Puedes obtener la información del usuario de result.user
    } catch (error) {
      // Manejo de errores
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });


  return (
    <StyledSessionCard mx="auto" my="2rem" boxShadow="large" borderRadius={8}>
      <form className="content" onSubmit={handleSubmit}>
      {visibility && (
      <H5 
        fontWeight="600" 
        fontSize="12px" 
        textAlign="center" 
        mb="0.5rem"
        color={`${color}`}
      >
        {message}
      </H5>
    )}


        <H3 textAlign="center" mb="0.5rem">
        Crea tu cuenta
        </H3>

        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Por favor complete todos los datos del formulario para continuar
        </H5>

        <TextField
          fullwidth
          name="name"
          mb="0.75rem"
          label="Nombre completo          "
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name || ""}
          placeholder="Nombres y apellidos"
          errorText={touched.name && errors.name}
        />

        <TextField
          fullwidth
          mb="0.75rem"
          name="email"
          type="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email || ""}
          placeholder="Correo electronico o numero celular"
          label="Email o celular"
          errorText={touched.email && errors.email}
        />

        <TextField
          fullwidth
          mb="0.75rem"
          name="password"
          label="Contraseña"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password || ""}
          errorText={touched.password && errors.password}
          type={passwordVisibility ? "text" : "password"}
          endAdornment={
            <IconButton
              p="0.25rem"
              mr="0.25rem"
              type="button"
              color={passwordVisibility ? "gray.700" : "gray.600"}
              onClick={togglePasswordVisibility}
            >
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
          autocomplete="new-password"
        />
        <TextField
          mb="1rem"
          fullwidth
          name="re_password"
          placeholder="*********"
          label="Confirmar Contraseña"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password || ""}
          type={passwordVisibility ? "text" : "password"}
          errorText={touched.re_password && errors.re_password}
          endAdornment={
            <IconButton
              p="0.25rem"
              size="small"
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
          autocomplete="new-password"
        />

        <CheckBox
          mb="1.75rem"
          name="agreement"
          color="secondary"
          onChange={handleChange}
          checked={values.agreement}
          label={
            <FlexBox>
              <SemiSpan>Al registrarte, aceptas</SemiSpan>
              <a href="/" target="_blank" rel="noreferrer noopener">
                <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                 Términos y condiciones
                </H6>
              </a>
            </FlexBox>
          }
        />

        <Button
          mb="1.65rem"
          variant="contained"
          color="primary"
          type="submit"
          fullwidth
          onClick={(e) => {
            e.preventDefault(); // Prevenir el comportamiento de envío del formulario
            const email = values.email; // Suponiendo que `values` es el estado del formulario que contiene el email
            const password = values.password; // Suponiendo que `values` contiene la contraseña
            handleEmailPasswordSignup(email, password);
          }}
        >
          Crear cuenta
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
          onClick={handleFacebookSignup} 
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
          <Small fontWeight="600">Registrarme con Facebook</Small>
        </FlexBox>

        <FlexBox
          onClick={handleGoogleSignup} 
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
          <Small fontWeight="600">Registrame con Google</Small>
        </FlexBox>
      </form>

      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Ya tienes una cuenta?</SemiSpan>
        <Link href="/login">
          <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
            Inicia sesion aquí
          </H6>
        </Link>
      </FlexBox>
    </StyledSessionCard>
  );
};

const initialValues = {
  name: "",
  email: "",
  password: "",
  re_password: "",
  agreement: false,
};

const formSchema = yup.object().shape({
  name: yup.string().required("${path} is required"),
  email: yup.string().email("invalid email").required("${path} is required"),
  password: yup.string().required("${path} is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Por favor vuelva a escribir la contraseña"),
  agreement: yup
    .bool()
    .test(
      "agreement",
      "You have to agree with our Terms and Conditions!",
      (value) => value === true
    )
    .required("You have to agree with our Terms and Conditions!"),
});

export default Signup;
