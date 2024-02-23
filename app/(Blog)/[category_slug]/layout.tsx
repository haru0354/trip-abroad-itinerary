import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideMenu from "../../components/blog/SideMenu";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-blue-50 py-8">
        <div className="max-w-[1150px] mx-auto flex flex-col md:flex-row mb-8">
          <div className="w-full md:w-3/4 bg-white rounded-sm py-8 px-12 mr-8 ">
            {children}
          </div>
          <div className="w-full md:w-1/4 py-4 bg-white rounded">
            <SideMenu />
          </div>
        </div>
      </div>
    </>
  );
}
