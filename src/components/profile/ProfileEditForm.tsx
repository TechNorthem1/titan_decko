"use client";
import * as yup from "yup";
import { Formik } from "formik";
import Box from "@component/Box";
import Hidden from "@component/hidden";
import Avatar from "@component/avatar";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import Grid from "@component/grid/Grid";
import TextField from "@component/text-field";

interface ProfileEditFormProps {
  user:any
}
const ProfileEditForm:React.FC<ProfileEditFormProps> = ({ user }) => {

  const INITIAL_VALUES = {
    name: user?.lastname?.stringValue?.length === 0 ? "" : user?.name?.stringValue,
    lastname: user?.lastname?.stringValue?.length === 0 ? "" : user?.lastname?.stringValue,
    email: user?.lastname?.stringValue?.length === 0 ? "" : user?.email?.stringValue,
    phone: user?.lastname?.stringValue?.length === 0 ? "" : user?.phone?.stringValue,
    address: user?.lastname?.stringValue?.length === 0 ? "" : user?.address?.stringValue,
    document: user?.lastname?.stringValue?.length === 0 ? "" : user?.document?.stringValue
  }

  const VALIDATION_SCHEMA = yup.object().shape({
    name: yup.string().required("required"),
    lastname: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup.string().required("required"),
    address: yup.date().required("invalid date"),
  });

  const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
    console.log(values);
  };

  return (
    <>
      <FlexBox alignItems="flex-end" mb="22px">
        <Avatar src="/assets/images/faces/ralph.png" size={64} />

        <Box ml="-20px" zIndex={1}>
          <label htmlFor="profile-image">
            <Button
              p="6px"
              as="span"
              size="small"
              height="auto"
              bg="gray.300"
              color="secondary"
              borderRadius="50%"
            >
              <Icon>camera</Icon>
            </Button>
          </label>
        </Box>

        <Hidden>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="profile-image"
            onChange={(e) => console.log(e.target.files)}
          />
        </Hidden>
      </FlexBox>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box mb="30px">
              <Grid container horizontal_spacing={6} vertical_spacing={4}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullwidth
                    name="name"
                    label="Nombres"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={INITIAL_VALUES.name}
                    errorText={touched.name && errors.name}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullwidth
                    name="lastname"
                    label="Apellidos"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={INITIAL_VALUES.lastname}
                    errorText={touched.lastname && errors.lastname}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullwidth
                    name="email"
                    type="email"
                    label="Correo Electronico"
                    onBlur={handleBlur}
                    value={INITIAL_VALUES.email}
                    onChange={handleChange}
                    errorText={touched.email && errors.email}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullwidth
                    label="Telefono"
                    name="phone"
                    onBlur={handleBlur}
                    value={INITIAL_VALUES.phone}
                    onChange={handleChange}
                    errorText={touched.phone && errors.phone}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullwidth
                    type="text"
                    name="address"
                    label="Direccion"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={INITIAL_VALUES.address}
                    errorText={touched.address && errors.address}
                  />
                </Grid>
              </Grid>
            </Box>

            <Button type="submit" variant="contained" color="primary">
              Guardar cambios
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ProfileEditForm;
