import type { Metadata } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import AuthContext from "../../context/AuthContext";
import ToastContext from "../../context/ToastContext";

config.autoAddCss = false;

const siteTItle = process.env.NEXT_PUBLIC_ITINERARY_TITLE;
const brandTItle = process.env.NEXT_PUBLIC_ITINERARY_BRAND_TITLE;
const siteDescription = process.env.NEXT_PUBLIC_ITINERARY_DESCRIPTION;

export const metadata: Metadata = {
  title: {
    default: `${siteTItle}`,
    template: `%s | ${brandTItle}`,
  },
  description:
    `${siteDescription}`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <AuthContext>
        <ToastContext />
        {children}
      </AuthContext>
    </>
  );
}
