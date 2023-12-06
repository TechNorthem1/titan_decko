"use client";
import { useRouter } from "next/navigation";
import { Button } from "@component/buttons";

const BackToAddress = () => {
  const { push } = useRouter();
  return (
    <Button
      px="2rem"
      color="primary"
      bg="primary.light"
      onClick={() => push("/address")}
    >
      Volver a mi dirección
    </Button>
  );
};

export default BackToAddress;
