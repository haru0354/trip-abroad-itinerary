import type { Metadata } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { ModalProvider } from "@/app/context/ModalContext";
import {
  itineraryBrandTitle,
  itinerarySiteDescription,
  itinerarySiteTItle,
} from "./config/itineraryConfig";
import ToastContext from "../../context/ToastContext";

config.autoAddCss = false;
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    default: `${itinerarySiteTItle}`,
    template: `%s | ${itineraryBrandTitle}`,
  },
  description: `${itinerarySiteDescription}`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ModalProvider>
      <ToastContext />
      {children}
    </ModalProvider>
  );
}
