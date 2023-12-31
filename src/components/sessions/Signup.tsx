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
import Image from "@component/Image";
import Authentication from "@helpers/Autentication";
import Client from "@models/Client.model";
import FirebaseService from "@services/FirebaseService";

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

  const getDataForm = (e:any, values:any) => {
    let client:any = Authentication.register(e, values);
    handleEmailPasswordSignup(client);
  }

  const handleEmailPasswordSignup = async (client:Client|any) => {
    try {
      let user = await FirebaseService.getUser(client.email);
      if (user.length >= 1){
        setMessage("El usuario ya se encuntra registrado");
        setVisibility(true);
        setColor(colors.titan.salmon)
        setTimeout(() => {
          setMessage("");
          setVisibility(false);
        }, 3000);
        return false;
      }

      let saveUser = await FirebaseService.createUser(client);

      if (!saveUser){
        setMessage("El usuario ya se encuntra registrado");
        setVisibility(true);
        setColor(colors.titan.salmon)
        setTimeout(() => {
          setMessage("");
          setVisibility(false);
        }, 3000);
        return false;
      }


      await createUserWithEmailAndPassword(auth, client.email, client.password);
      setMessage("El Usuario ha sido registrado correctamente");
      setVisibility(true);
      setColor(colors.titan.success);
      setTimeout(() => {
        setMessage("");
        setVisibility(false);
      }, 3000);
    } catch (error) {
      setMessage("El Usuario ya se encuntra registrado");
      setVisibility(true);
      setColor(colors.titan.salmon)
      setTimeout(() => {
        setMessage("");
        setVisibility(false);
      }, 3000);
      console.log(error)
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

        <FlexBox className="logo" alignItems="center" justifyContent="center">
          <Link href="/">
            <Image src="/assets/images/logo.webp" alt="logo" />
          </Link>
        </FlexBox>

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

        <div className="content-form-control" style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap:"10px"}}>
          <TextField
            fullwidth
            name="name"
            mb="0.75rem"
            label="Nombres completo"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name || ""}
            placeholder="Nombres Completos"
            errorText={touched.name && errors.name}
          />
          <TextField
            fullwidth
            name="lastname"
            mb="0.75rem"
            label="Apellidos completo"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.lastname || ""}
            placeholder="Apellidos Completos"
            errorText={touched.lastname && errors.lastname}
          />

          <TextField
            fullwidth
            mb="0.75rem"
            name="phone"
            type="tel"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.phone || ""}
            placeholder="Numero celular"
            label="Numero celular"
            errorText={touched.phone && errors.phone}
          />

          <TextField
            fullwidth
            mb="0.75rem"
            name="email"
            type="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email || ""}
            placeholder="Correo electronico"
            label="Correo electronico"
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
        </div>

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
          onClick={(e) => { getDataForm(e, values) }}
        >
          Crear cuenta
        </Button>

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
  lastname: "",
  email: "",
  phone: "",
  password: "",
  re_password: "",
  agreement: false,
};

const formSchema = yup.object().shape({
  name: yup.string().required("${path} es requerido"),
  lastname: yup.string().required("${path} es requerido"),
  phone: yup.string().required("${path} es requerido"),
  email: yup.string().email("invalid email").required("${path} es requerido"),
  password: yup.string().required("${path} es requerido"),
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