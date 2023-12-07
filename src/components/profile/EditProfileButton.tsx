"use client";
import { useRouter } from "next/navigation";
import { Button } from "@component/buttons";
import { colors } from "@utils/themeColors";


const EditProfileButton = () => {
  const { push } = useRouter();
  return (
    <Button
      style={{color: colors.titan.dark, backgroundColor: colors.titan.yellow}}
      px="2rem"
      onClick={() => push("/profile/edit")}
    >
      Editar Perfil
    </Button>
  );
};

export default EditProfileButton;
