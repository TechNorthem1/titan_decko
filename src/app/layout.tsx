import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import StyledComponentsRegistry from "@lib/registry";
import { AppProvider } from "@context/AppContext";
import StyledContext from "@context/StyledContext";

import "../__server__";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  authors: [{name: "Titan decko"}],
  icons: "/assets/images/icons/icon_titan.webp",
  title: "Titan Decko",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={openSans.className}>
        <StyledComponentsRegistry>
          <AppProvider>
            <StyledContext>{children}</StyledContext>
          </AppProvider>
        </StyledComponentsRegistry>
        <script src="https://kit.fontawesome.com/b13e9656a1.js" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}