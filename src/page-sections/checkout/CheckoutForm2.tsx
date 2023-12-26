"use client";
import * as yup from "yup";
import { Formik } from "formik";
import { format } from "date-fns";
import Box from "@component/Box";
import NextImage from "next/legacy/image";
import Card from "@component/Card";
import Avatar from "@component/avatar";
import Select from "@component/Select";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { useRouter } from "next/navigation";
import { Card1 } from "@component/Card1";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import { FC, useEffect, useState } from "react";
import Typography, { H6, Paragraph } from "@component/Typography";

const CheckoutForm2: FC = () => {
  const router = useRouter();
  const [dateList, setDateList] = useState([]);
  const [hasVoucher, setHasVoucher] = useState(false);

  const handleFormSubmit = async (values: any) => {
    console.log(values);
    router.push("/payment");
  };

  const handleFieldValueChange =
    (value: string, fieldName: string, setFieldValue: any) => () => {
      setFieldValue(fieldName, value);
    };

  const toggleHasVoucher = () => setHasVoucher((has) => !has);

  useEffect(() => {
    let list: any = [];
    let today = new Date();
    let dateCount = today.getDate();

    list.push({ label: format(today, "dd MMMM"), value: today });

    for (let i = 1; i < 10; i++) {
      today.setDate(dateCount + i);
      list.push({ label: format(today, "dd MMMM"), value: today });
    }

    setDateList(list as any);
  }, []);

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={checkoutSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Card1 mb="1.5rem" borderRadius={8}>
            <FlexBox alignItems="center" mb="1.75rem">
              <Avatar
                bg="primary.main"
                size={32}
                color="primary.text"
                mr="0.875rem"
              >
                1
              </Avatar>
              <Typography fontSize="20px">Detalles de tu envio</Typography>
            </FlexBox>

            <Box mb="1.75rem">
              <Grid container spacing={6}>
                <Grid item sm={6} xs={12}>
                  <Select
                    label="Fecha de entrega"
                    options={dateList}
                    value={values.date || ""}
                    onChange={(date) => {
                      setFieldValue("date", date);
                    }}
                    errorText={touched.date && errors.date}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Select
                    label="Hora de entrega"
                    options={timeList}
                    value={values.time || ""}
                    onChange={(time) => {
                      setFieldValue("time", time);
                    }}
                    errorText={touched.time && errors.time}
                  />
                </Grid>
              </Grid>
            </Box>

            <Typography mb="0.75rem">Dirección de entrega</Typography>
            <Grid container spacing={6}>
              {addressList.map((item, ind) => (
                <Grid item md={4} sm={6} xs={12} key={ind}>
                  <Card
                    borderRadius={8}
                    bg="gray.100"
                    p="1rem"
                    boxShadow="none"
                    border="1px solid"
                    cursor="pointer"
                    borderColor={
                      item.address === values.address
                        ? "primary.main"
                        : "transparent"
                    }
                    onClick={handleFieldValueChange(
                      item.address,
                      "address",
                      setFieldValue
                    )}
                  >
                    <H6 mb="0.25rem">{item.addressType}</H6>
                    <Paragraph color="gray.700">{item.address}</Paragraph>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card1>

          <Card1 mb="1.5rem" borderRadius={8}>
            <FlexBox alignItems="center" mb="1.75rem">
              <Avatar
                bg="primary.main"
                size={32}
                color="primary.text"
                mr="0.875rem"
              >
                3
              </Avatar>
              <Typography fontSize="20px">Personal Details</Typography>
            </FlexBox>

            <Typography mb="0.75rem">Información de contacto</Typography>

            <Grid container spacing={6}>
              {contactList.map((item) => (
                <Grid item md={4} sm={6} xs={12} key={item.contact}>
                  <Card
                    borderRadius={8}
                    bg="gray.100"
                    p="1rem"
                    boxShadow="none"
                    border="1px solid"
                    cursor="pointer"
                    borderColor={
                      item.contact === values.contact
                        ? "primary.main"
                        : "transparent"
                    }
                    onClick={handleFieldValueChange(
                      item.contact,
                      "contact",
                      setFieldValue
                    )}
                  >
                    <H6 mb="0.25rem">{item.contactType}</H6>
                    <Paragraph color="gray.700">{item.contact}</Paragraph>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card1>

          <Card1 mb="1.5rem" borderRadius={8}>
            <FlexBox alignItems="center" mb="1.75rem">
              <Avatar
                bg="primary.main"
                size={32}
                color="primary.text"
                mr="0.875rem"
              >
                3
              </Avatar>
              <Typography fontSize="20px">Detalles del pago</Typography>
            </FlexBox>

            <Typography mb="0.75rem">Metodos de pago guardados</Typography>

            <Grid container spacing={6}>
              {paymentMethodList.map((item) => (
                <Grid item md={4} sm={6} xs={12} key={item.last4Digits}>
                  <Card
                    borderRadius={8}
                    bg="gray.100"
                    p="1rem"
                    boxShadow="none"
                    border="1px solid"
                    cursor="pointer"
                    borderColor={
                      item.last4Digits === values.card
                        ? "primary.main"
                        : "transparent"
                    }
                    onClick={handleFieldValueChange(
                      item.last4Digits,
                      "card",
                      setFieldValue
                    )}
                  >
                    <Box
                      height="24px"
                      width="36px"
                      position="relative"
                      mb="0.5rem"
                    >
                      <NextImage
                        src={`/assets/images/payment-methods/${item.cardType}.svg`}
                        layout="fill"
                        objectFit="contain"
                        alt="bonik"
                      />
                    </Box>

                    <Paragraph color="gray.700">
                      **** **** **** {item.last4Digits}
                    </Paragraph>
                    <Paragraph color="gray.700">{item.name}</Paragraph>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Paragraph
              className="cursor-pointer"
              color="primary.main"
              mt="1.5rem"
              lineHeight="1"
              onClick={toggleHasVoucher}
            >
              Tengo un cupón.
            </Paragraph>

            {hasVoucher && (
              <FlexBox mt="1.5rem" maxWidth="400px">
                <TextField
                  name="voucher"
                  placeholder="Enter voucher code here"
                  fullwidth
                  value={values.voucher || ""}
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  ml="1rem"
                >
                  Aplicar
                </Button>
              </FlexBox>
            )}

            <Button
              variant="contained"
              color="primary"
              mt="1.5rem"
              type="submit"
              fullwidth
            >
              Realizar pedido
            </Button>
          </Card1>
        </form>
      )}
    </Formik>
  );
};

const addressList = [
  { addressType: "Home", address: "435 Bristol Avenue, Abington MA 2351" },
  { addressType: "Office", address: "777 Brockton Avenue, Abington MA 2351" },
  { addressType: "Office 2", address: "777 Kazi Avenue, Abington MA 2351" },
];

const contactList = [
  { contactType: "Primary", contact: "+1-202-555-0119" },
  { contactType: "Secondary", contact: "+1-202-555-0222" },
];

const paymentMethodList = [
  { cardType: "Amex", last4Digits: "4765", name: "Jaslynn Land" },
  { cardType: "Mastercard", last4Digits: "5432", name: "Jaslynn Land" },
  { cardType: "Visa", last4Digits: "4543", name: "Jaslynn Land" },
];

const timeList = [
  { label: "9AM - 11AM", value: "9AM - 11AM" },
  { label: "11AM - 1PM", value: "11AM - 1PM" },
  { label: "3PM - 5PM", value: "3PM - 5PM" },
  { label: "5PM - 7PM", value: "5PM - 7PM" },
];

const initialValues = {
  address: "",
  contact: "",
  card: "",
  date: "",
  time: "",
  voucher: "",
};

const checkoutSchema = yup.object().shape({
  address: yup.string().required("required"),
  contact: yup.string().required("required"),
  card: yup.string().required("required"),
  date: yup.object().required("required"),
  time: yup.object().required("required"),
  voucher: yup.string(),
});

export default CheckoutForm2;
