import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import StyledComponentsRegistry from "@lib/registry";
import { AppProvider } from "@context/AppContext";
import StyledContext from "@context/StyledContext";

import "../__server__";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Titan Decko",
  authors: [{name: "Titan decko"}],
  icons: "/assets/images/icons/icon_titan.webp",
  description : "somos una tienda de e-commerce de productos para el hogar",
  keywords: "titan, hogar, tienda, e-commerce",
  robots: "index, follow"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ES-co">

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