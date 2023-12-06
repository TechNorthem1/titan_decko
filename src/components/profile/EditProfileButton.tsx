"use client";
import { useRouter } from "next/navigation";
import { Button } from "@component/buttons";

const EditProfileButton = () => {
  const { push } = useRouter();
  return (
    <Button
      color="primary"
      bg="primary.light"
      px="2rem"
      onClick={() => push("/profile/edit")}
    >
      Editar Perfil
    </Button>
  );
};

export default EditProfileButton;
