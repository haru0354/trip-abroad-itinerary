"use client";

import AuthContext from "@/app/context/AuthContext";
import ToastContext from "@/app/context/ToastContext";

export default function RootLayout({
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
