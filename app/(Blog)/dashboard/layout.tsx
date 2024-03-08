import { Inter } from "next/font/google";
import ToastContext from "@/app/context/ToastContext";
import AuthContext from "@/app/context/AuthContext";
import AuthGuard from "@/app/components/auth/authGuard/BlogAuthGuard";
import DashboardSideMenu from "@/app/components/blog/dashboard/DashboardSideMenu";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthContext>
        <AuthGuard>
          <ToastContext />
          <div className="flex bg-sky-50">
            <DashboardSideMenu />
            <div className="flex justify-center items-center mx-auto w-full max-w-[1200px] ml-0 sm:ml-96 bg-white border rounded border-gray-200 p-5 mt-8">
              <div className="w-full">{children}</div>
            </div>
          </div>
        </AuthGuard>
      </AuthContext>
    </>
  );
}
