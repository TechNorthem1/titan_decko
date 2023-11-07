import { LayoutProps } from "interfaces";
import AppLayout from "@component/layout/AppLayout";

export default function PruebaLayout({ children }: LayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
