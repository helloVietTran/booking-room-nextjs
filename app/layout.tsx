import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./styles/globals.css"
import "./styles/navbar.css"

import NavBar from "./components/navbar/NavBar";
import ToastProvider from "./providers/ToastProvider";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import VerifyModal from "./components/modals/VerifyModal";
import RentModal from "./components/modals/RentModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book room web",
  description: "Book room in every trip",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className="navbar">
        <ClientOnly>
         <ToastProvider />
          <VerifyModal />
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <NavBar />  
        </ClientOnly>    
      </div>
      <div className="navbar-placeholder"></div>
      <div className="pt-4 pb-4">
       {children}
      </div>
      </body>
    </html>
  );
}
