"use client";
import { Button } from "@component/buttons";
import { useRouter } from "next/navigation";

const AddNewAddress = () => {
  const router = useRouter();

  return (
    <Button
      px="2rem"
      color="primary"
      bg="primary.light"
      onClick={() => router.push("/address/create")}
    >
      Añadir una nueva dirección
    </Button>
  );
};

export default AddNewAddress;
