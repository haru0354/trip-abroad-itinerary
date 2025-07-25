import { Metadata } from "next";

import { blogBrandTitle } from "../../config/blogConfig";
import { ModalProvider } from "@/app/context/ModalContext";
import ToastContext from "@/app/context/ToastContext";
import DashboardSideMenu from "../../components/dashboard/side-menu/DashboardSideMenu";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "ダッシュボードメモ",
    template: `%s | ${blogBrandTitle}`,
  },
  robots: {
    index: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ModalProvider>
      <ToastContext />
      <div className="flex bg-blog-bgDashboardColor">
        <DashboardSideMenu />
        <div className="flex justify-center items-start w-full max-w-[1200px] min-h-[93vh] p-5 my-8 mx-auto ml-0 sm:ml-96 bg-white border rounded border-blog-borderGray">
          <div className="w-full">{children}</div>
        </div>
      </div>
    </ModalProvider>
  );
}
