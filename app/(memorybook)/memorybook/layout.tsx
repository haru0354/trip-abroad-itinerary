import type { Metadata } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { ModalProvider } from "@/app/context/ModalContext";
import AuthContext from "../../context/AuthContext";
import ToastContext from "../../context/ToastContext";
import { itineraryBrandTitle } from "./config/itineraryConfig";

config.autoAddCss = false;

const siteTItle = process.env.NEXT_PUBLIC_ITINERARY_TITLE;
const siteDescription = process.env.NEXT_PUBLIC_ITINERARY_DESCRIPTION;

export const metadata: Metadata = {
  title: {
    default: `${siteTItle}`,
    template: `%s | ${itineraryBrandTitle}`,
  },
  description: `${siteDescription}`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthContext>
        <ModalProvider>
          <ToastContext />
          {children}
        </ModalProvider>
      </AuthContext>
    </>
  );
}
