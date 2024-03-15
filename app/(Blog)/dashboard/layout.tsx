import { Metadata } from "next";
import ToastContext from "@/app/context/ToastContext";
import AuthContext from "@/app/context/AuthContext";
import DashboardSideMenu from "@/app/components/blog/dashboard/DashboardSideMenu";

export const metadata: Metadata = {
  title: "ダッシュボード",
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
          <div className="flex bg-sky-50">
            <DashboardSideMenu />
            <div className="flex justify-center items-center mx-auto w-full max-w-[1200px] ml-0 sm:ml-96 bg-white border rounded border-gray-200 p-5 mt-8">
              <div className="w-full">{children}</div>
            </div>
          </div>
      </AuthContext>
    </>
  );
}
