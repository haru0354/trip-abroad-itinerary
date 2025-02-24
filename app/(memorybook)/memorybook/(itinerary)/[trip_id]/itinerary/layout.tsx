import type { Metadata } from "next";
import { itineraryBrandTitle } from "../../../config/itineraryConfig";

export const metadata: Metadata = {
  title: {
    default: "旅程表",
    template: `%s | ${itineraryBrandTitle}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
