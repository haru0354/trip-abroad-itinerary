import type { Metadata } from "next";

import { blogBrandTitle, blogTitle } from "../config/blogConfig";
import Header from "../components/layout/blog/Header";
import Footer from "../components/layout/blog/Footer";
import MainContainer from "@/app/components/layout/MainContainer";
import AuthContext from "@/app/context/AuthContext";
import ToastContext from "@/app/context/ToastContext";

export const metadata: Metadata = {
  title: {
    default: `${blogTitle}`,
    template: `%s | ${blogBrandTitle}`,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1 px-2 ">
        <MainContainer bgNone={true}>
          <div className="w-full px-1 md:px-4">
            <AuthContext>
              <ToastContext />
              {children}
            </AuthContext>
          </div>
        </MainContainer>
      </main>
      <Footer />
    </>
  );
}
